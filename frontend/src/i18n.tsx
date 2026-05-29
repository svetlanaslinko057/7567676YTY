/**
 * Lightweight i18n layer for the Expo app.
 *
 * - Three languages: en (default) + ru + uk.
 * - Choice persisted in AsyncStorage under `atlas_lang`.
 * - When the user is authenticated, the choice is also pushed to the backend
 *   (`PATCH /account/me { language }`) so the same preference follows the
 *   account across devices.
 * - Components subscribe via `useT()` which returns:
 *     { t, lang, setLang, langs }
 *   `t('key')` returns the translated string for the current language with a
 *   safe fallback to English (and finally the key itself).
 *
 * The dictionary is intentionally compact — a "lite" pass covering the most
 * visible UX surfaces: profile screens, settings, common buttons. Adding new
 * strings is a 1-line edit per language; missing keys fall back gracefully.
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export type LangCode = 'en' | 'ru' | 'uk';

export const LANGS: { code: LangCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська' },
];

export const STORAGE_KEY = 'atlas_lang';

type Dict = Record<string, string>;

const EN: Dict = {
  // Generic
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.retry': 'Retry',
  'common.loading': 'Loading…',
  'common.coming_soon': 'Coming soon',
  'common.ok': 'OK',
  'common.dev_mode': 'DEV mode',

  // Profile
  'profile.title': 'Profile',
  'profile.you': 'You',
  'profile.role.client': 'Client',
  'profile.role.developer': 'Developer',
  'profile.role.admin': 'Admin',
  'profile.section.account': 'Account',
  'profile.section.support': 'Support',
  'profile.section.workspace': 'Workspace',
  'profile.section.roles': 'Roles',
  'profile.section.actions': 'Actions',
  'profile.section.insights': 'Developer insights',
  'profile.section.wallet': 'Wallet',
  'profile.row.account_details': 'Account details',
  'profile.row.referrals': 'Referrals',
  'profile.row.referrals_earn': 'Referrals — earn 7%',
  'profile.row.documents': 'Documents',
  'profile.row.support': 'Help & support',
  'profile.row.replay_tour': 'Replay welcome tour',
  'profile.row.switch_role': 'Switch role',
  'profile.row.settings': 'Settings',
  'profile.row.time_logs': 'Time logs',
  'profile.row.time_logs_sub': 'Hours across your tasks',
  'profile.row.leaderboard': 'Leaderboard',
  'profile.row.leaderboard_sub': 'Where you stand among developers',
  'profile.row.growth': 'Growth',
  'profile.row.growth_sub': 'How close you are to the next tier',
  'profile.row.projects': 'My projects',
  'profile.row.work': 'My work',
  'profile.row.admin': 'Control center',
  'profile.row.billing': 'Billing & payments',
  'profile.stats.projects': 'Projects',
  'profile.stats.invested': 'Invested',
  'profile.stats.member': 'Member',
  'profile.stats.building': 'BUILDING',
  'profile.stats.earned': 'EARNED',
  'profile.stats.roles': 'ROLES',
  'profile.signout': 'Sign out',
  'profile.signout_confirm': 'Sign out of admin session?',
  'profile.signout_action': 'Logout',
  'profile.empty.title': 'Pick how you show up',
  'profile.empty.sub': 'Start a project or join as a developer — you choose.',
  'profile.empty.cta': 'Go to Home',
  'profile.wallet.available': 'Available',
  'profile.wallet.pending': 'pending',
  'profile.wallet.withdraw': 'Withdraw',
  'profile.role.current': 'Current view',
  'profile.role.switch_to': 'Switch to',
  'profile.role.also_have': 'You also have access as',

  // Settings
  'settings.title': 'Settings',
  'settings.section.identity': 'Identity',
  'settings.section.security': 'Security',
  'settings.section.appearance': 'Appearance',
  'settings.section.account': 'Account',
  'settings.edit_profile': 'Edit name & avatar',
  'settings.signin_method': 'Sign-in method',
  'settings.signin_value': 'Email · OTP code',
  'settings.twofa': 'Two-factor auth',
  'settings.twofa_on': 'Two-factor authentication enabled.',
  'settings.twofa_off': 'Two-factor authentication disabled.',
  'settings.twofa_disable_title': 'Disable 2FA',
  'settings.twofa_disable_msg': 'Enter your 6-digit authenticator code, or a recovery code (XXXXX-XXXXX).',
  'settings.change_email': 'Change email',
  'settings.theme': 'Theme',
  'settings.theme.dark': 'Dark',
  'settings.theme.light': 'Light',
  'settings.theme.light_saved': 'Light theme rendering will arrive in the next release. Your preference is saved.',
  'settings.language': 'Language',
  'settings.language_saved': 'Language preference saved.',
  'settings.export_data': 'Export my data',
  'settings.export_msg': 'Your data will be emailed to you within 24h.',
  'settings.export_ok': 'Your data file has been downloaded.',
  'settings.delete_account': 'Delete account',
  'settings.delete_msg': 'Account deletion requires support to confirm pending payouts and active contracts. Reach out to support@atlas.dev.',
  'settings.version': 'ATLAS DevOS · v1.0',

  // Errors
  'error.generic': 'Something went wrong',
  'error.switch': 'Switch failed',
  'error.copy': 'Copy failed',

  // Onboarding tour — CLIENT
  'tour.client.welcome.title': 'Welcome to EVA-X',
  'tour.client.welcome.body': "Let's take a quick tour of your cabinet. 30 seconds — you'll know exactly where everything lives.",
  'tour.client.home.title': 'Home',
  'tour.client.home.body': 'Your dashboard. Active projects at a glance, recent activity, and quick actions for what needs your attention.',
  'tour.client.projects.title': 'Projects',
  'tour.client.projects.body': 'All your projects live here. Tap any project to see its scope, builders, milestones and live progress.',
  'tour.client.activity.title': 'Activity',
  'tour.client.activity.body': 'Real-time feed: modules completed, decisions you need to make, deliveries shipped, payments processed.',
  'tour.client.billing.title': 'Billing',
  'tour.client.billing.body': 'Invoices, escrow balance, payment plans and receipts. Always know what you have paid and what is next.',
  'tour.client.profile.title': 'Profile',
  'tour.client.profile.body': 'Your account, settings, referrals, community programs and support. Replay this tour from here anytime.',
  'tour.client.alerts.title': 'Alerts',
  'tour.client.alerts.body': 'Important updates about your projects appear here — decisions waiting, payouts, milestone shipments.',
  'tour.client.chat.title': 'Direct chat',
  'tour.client.chat.body': 'Talk to your team directly. Project context is auto-attached, so we always know which project you mean.',

  // Onboarding tour — DEVELOPER
  'tour.developer.welcome.title': 'Welcome, Builder',
  'tour.developer.welcome.body': "Let's tour your workspace. 30 seconds — and you will know exactly where tasks, earnings and feedback live.",
  'tour.developer.home.title': 'Home',
  'tour.developer.home.body': 'Your daily focus: assigned modules, what needs review, what is blocked. Everything you act on today.',
  'tour.developer.market.title': 'Market',
  'tour.developer.market.body': 'Open modules looking for a builder. Filter by skill, scope and rate — claim what matches your strengths.',
  'tour.developer.acceptance.title': 'Acceptance',
  'tour.developer.acceptance.body': 'Modules waiting for QA verdicts. See feedback, fix loops, and move work toward shipped status.',
  'tour.developer.earnings.title': 'Earnings',
  'tour.developer.earnings.body': 'Live ledger: held, available, paid out. Connect a payout method and track every cent in real time.',
  'tour.developer.leaderboard.title': 'Leaderboard',
  'tour.developer.leaderboard.body': 'Where you rank in the builder community. Grow reputation, unlock higher-tier modules and referrals.',
  'tour.developer.alerts.title': 'Alerts',
  'tour.developer.alerts.body': 'Module updates, QA decisions, earnings events — anything that needs your eyes lands here.',

  // Onboarding tour — TOOLTIP UI (chrome of the spotlight card)
  'tour.ui.next': 'Next →',
  'tour.ui.back': 'Back',
  'tour.ui.got_it': 'Got it',
  'tour.ui.skip': 'Skip the tour',
  'tour.ui.step_counter': '{n} of {total}',

  // Onboarding tour — ADMIN
  'tour.admin.welcome.title': 'Welcome, Admin',
  'tour.admin.welcome.body': "Quick orientation for the admin console — pipeline, users, payouts and system controls. Takes under a minute.",
  'tour.admin.home.title': 'Home',
  'tour.admin.home.body': 'Operational snapshot: active projects, queue depth, today\'s critical events and pending decisions.',
  'tour.admin.pipeline.title': 'Pipeline',
  'tour.admin.pipeline.body': 'Master view of every request from intake to shipped. Drag-into-states, assign builders, override scope.',
  'tour.admin.users.title': 'Users',
  'tour.admin.users.body': 'Clients, builders, testers, operators. Manage roles, block, recover sessions and audit access in one place.',
  'tour.admin.payouts.title': 'Payouts',
  'tour.admin.payouts.body': 'Live worker, retries, dead-letter, reconciliation divergences. The money substrate in one pane.',
  'tour.admin.alerts.title': 'Alerts',
  'tour.admin.alerts.body': 'Critical system events — failed payouts, escalated tickets, QA backlog — surface here as they happen.',

  // Onboarding tour — OPERATOR
  'tour.operator.welcome.title': 'Welcome, Operator',
  'tour.operator.welcome.body': 'A 30-second tour of your queue-first workspace — review queue, autonomy, dispatch.',
  'tour.operator.home.title': 'Home',
  'tour.operator.home.body': 'Your day at a glance: queues to clear, pending verdicts, autonomy proposals and dispatch needs.',
  'tour.operator.queue.title': 'Review queue',
  'tour.operator.queue.body': 'Modules and deliverables waiting for an operator verdict. Triage, approve, return for fixes.',
  'tour.operator.autonomy.title': 'Autonomy',
  'tour.operator.autonomy.body': 'Proposed actions awaiting human confirmation. Override, approve, or let the engine proceed.',
  'tour.operator.dispatch.title': 'Dispatch',
  'tour.operator.dispatch.body': 'Match open modules to builders by skill, capacity, and reputation. Push out work in one tap.',
  'tour.operator.alerts.title': 'Alerts',
  'tour.operator.alerts.body': 'Stuck tasks, overloaded builders, QA backlog — anything that needs a human nudge lands here.',
};

const RU: Dict = {
  // Generic
  'common.save': 'Сохранить',
  'common.cancel': 'Отмена',
  'common.retry': 'Повторить',
  'common.loading': 'Загрузка…',
  'common.coming_soon': 'Скоро',
  'common.ok': 'OK',
  'common.dev_mode': 'DEV режим',

  // Profile
  'profile.title': 'Профиль',
  'profile.you': 'Вы',
  'profile.role.client': 'Клиент',
  'profile.role.developer': 'Разработчик',
  'profile.role.admin': 'Админ',
  'profile.section.account': 'Аккаунт',
  'profile.section.support': 'Поддержка',
  'profile.section.workspace': 'Рабочее пространство',
  'profile.section.roles': 'Роли',
  'profile.section.actions': 'Действия',
  'profile.section.insights': 'Аналитика разработчика',
  'profile.section.wallet': 'Кошелёк',
  'profile.row.account_details': 'Данные аккаунта',
  'profile.row.referrals': 'Рефералы',
  'profile.row.referrals_earn': 'Рефералы — зарабатывайте 7%',
  'profile.row.documents': 'Документы',
  'profile.row.support': 'Помощь и поддержка',
  'profile.row.replay_tour': 'Повторить welcome-тур',
  'profile.row.switch_role': 'Сменить роль',
  'profile.row.settings': 'Настройки',
  'profile.row.time_logs': 'Учёт времени',
  'profile.row.time_logs_sub': 'Часы по вашим задачам',
  'profile.row.leaderboard': 'Рейтинг',
  'profile.row.leaderboard_sub': 'Ваше место среди разработчиков',
  'profile.row.growth': 'Развитие',
  'profile.row.growth_sub': 'Насколько вы близки к следующему уровню',
  'profile.row.projects': 'Мои проекты',
  'profile.row.work': 'Мои задачи',
  'profile.row.admin': 'Центр управления',
  'profile.row.billing': 'Биллинг и платежи',
  'profile.stats.projects': 'Проекты',
  'profile.stats.invested': 'Инвестировано',
  'profile.stats.member': 'С нами с',
  'profile.stats.building': 'В РАБОТЕ',
  'profile.stats.earned': 'ЗАРАБОТАНО',
  'profile.stats.roles': 'РОЛЕЙ',
  'profile.signout': 'Выйти',
  'profile.signout_confirm': 'Выйти из сессии администратора?',
  'profile.signout_action': 'Выйти',
  'profile.empty.title': 'Выберите, кто вы',
  'profile.empty.sub': 'Запустите проект или присоединитесь как разработчик — выбор за вами.',
  'profile.empty.cta': 'На главную',
  'profile.wallet.available': 'Доступно',
  'profile.wallet.pending': 'в ожидании',
  'profile.wallet.withdraw': 'Вывести',
  'profile.role.current': 'Текущее представление',
  'profile.role.switch_to': 'Переключиться на',
  'profile.role.also_have': 'У вас также есть доступ как',

  // Settings
  'settings.title': 'Настройки',
  'settings.section.identity': 'Идентификация',
  'settings.section.security': 'Безопасность',
  'settings.section.appearance': 'Внешний вид',
  'settings.section.account': 'Аккаунт',
  'settings.edit_profile': 'Изменить имя и аватар',
  'settings.signin_method': 'Способ входа',
  'settings.signin_value': 'Email · код OTP',
  'settings.twofa': 'Двухфакторная авторизация',
  'settings.twofa_on': 'Двухфакторная авторизация включена.',
  'settings.twofa_off': 'Двухфакторная авторизация отключена.',
  'settings.twofa_disable_title': 'Отключить 2FA',
  'settings.twofa_disable_msg': 'Введите 6-значный код из приложения-аутентификатора или recovery-код (XXXXX-XXXXX).',
  'settings.change_email': 'Сменить email',
  'settings.theme': 'Тема',
  'settings.theme.dark': 'Тёмная',
  'settings.theme.light': 'Светлая',
  'settings.theme.light_saved': 'Светлая тема появится в следующем релизе. Выбор сохранён.',
  'settings.language': 'Язык',
  'settings.language_saved': 'Выбор языка сохранён.',
  'settings.export_data': 'Экспорт моих данных',
  'settings.export_msg': 'Ваши данные будут отправлены на email в течение 24 часов.',
  'settings.export_ok': 'Файл с вашими данными загружен.',
  'settings.delete_account': 'Удалить аккаунт',
  'settings.delete_msg': 'Удаление требует подтверждения от поддержки (выплаты, активные контракты). Напишите на support@atlas.dev.',
  'settings.version': 'ATLAS DevOS · v1.0',

  // Errors
  'error.generic': 'Что-то пошло не так',
  'error.switch': 'Не удалось переключиться',
  'error.copy': 'Не удалось скопировать',

  // Onboarding tour — CLIENT
  'tour.client.welcome.title': 'Добро пожаловать в EVA-X',
  'tour.client.welcome.body': 'Давайте быстро пройдёмся по кабинету. 30 секунд — и вы будете знать, где что находится.',
  'tour.client.home.title': 'Главная',
  'tour.client.home.body': 'Ваш дашборд. Активные проекты с одного взгляда, последние события и быстрые действия.',
  'tour.client.projects.title': 'Проекты',
  'tour.client.projects.body': 'Все ваши проекты здесь. Тапните любой, чтобы увидеть скоуп, команду, вехи и прогресс.',
  'tour.client.activity.title': 'Активность',
  'tour.client.activity.body': 'Реалтайм-фид: завершённые модули, решения от вас, поставки, проведённые платежи.',
  'tour.client.billing.title': 'Биллинг',
  'tour.client.billing.body': 'Инвойсы, эскроу, рассрочки и чеки. Всегда знайте, что оплачено и что впереди.',
  'tour.client.profile.title': 'Профиль',
  'tour.client.profile.body': 'Аккаунт, настройки, рефералы, программы и поддержка. Тур можно перезапустить отсюда.',
  'tour.client.alerts.title': 'Уведомления',
  'tour.client.alerts.body': 'Важные обновления по вашим проектам — ожидающие решения, выплаты, поставки.',
  'tour.client.chat.title': 'Прямой чат',
  'tour.client.chat.body': 'Общайтесь с командой напрямую. Контекст проекта подтягивается автоматически.',

  // Onboarding tour — DEVELOPER
  'tour.developer.welcome.title': 'Привет, Builder',
  'tour.developer.welcome.body': 'Короткий тур по рабочему пространству. 30 секунд — и вы знаете, где задачи, заработок и фидбек.',
  'tour.developer.home.title': 'Главная',
  'tour.developer.home.body': 'Фокус дня: назначенные модули, что на ревью, что заблокировано. Всё, чем заниматься сегодня.',
  'tour.developer.market.title': 'Маркет',
  'tour.developer.market.body': 'Открытые модули в поиске билдера. Фильтр по скиллам, скоупу и ставке — забирайте подходящее.',
  'tour.developer.acceptance.title': 'Приёмка',
  'tour.developer.acceptance.body': 'Модули, ожидающие вердикта QA. Смотрите фидбек, делайте правки, двигайте к shipped.',
  'tour.developer.earnings.title': 'Заработок',
  'tour.developer.earnings.body': 'Лайв-леджер: удержано, доступно, выплачено. Подключите способ выплат и следите за каждым центом.',
  'tour.developer.leaderboard.title': 'Лидерборд',
  'tour.developer.leaderboard.body': 'Ваше место в комьюнити билдеров. Растите репутацию, открывайте более крутые модули.',
  'tour.developer.alerts.title': 'Уведомления',
  'tour.developer.alerts.body': 'Обновления модулей, решения QA, события по выплатам — всё, что требует внимания, здесь.',

  // Onboarding tour — TOOLTIP UI (хром карточки)
  'tour.ui.next': 'Далее →',
  'tour.ui.back': 'Назад',
  'tour.ui.got_it': 'Понятно',
  'tour.ui.skip': 'Пропустить тур',
  'tour.ui.step_counter': 'Шаг {n} из {total}',

  // Onboarding tour — ADMIN
  'tour.admin.welcome.title': 'Привет, Admin',
  'tour.admin.welcome.body': 'Быстрая ориентация в админ-консоли — pipeline, пользователи, выплаты, системные ручки. Меньше минуты.',
  'tour.admin.home.title': 'Главная',
  'tour.admin.home.body': 'Оперативный снимок: активные проекты, глубина очередей, критические события дня.',
  'tour.admin.pipeline.title': 'Pipeline',
  'tour.admin.pipeline.body': 'Мастер-вью каждого запроса от приёмки до shipped. Перетаскивайте, назначайте билдеров, правьте scope.',
  'tour.admin.users.title': 'Пользователи',
  'tour.admin.users.body': 'Клиенты, билдеры, тестеры, операторы. Роли, блокировки, сессии и аудит — в одном месте.',
  'tour.admin.payouts.title': 'Выплаты',
  'tour.admin.payouts.body': 'Воркер, ретраи, dead-letter, расхождения reconciliation. Money substrate одной панелью.',
  'tour.admin.alerts.title': 'Уведомления',
  'tour.admin.alerts.body': 'Критические события — упавшие выплаты, эскалированные тикеты, бэклог QA — появляются здесь.',

  // Onboarding tour — OPERATOR
  'tour.operator.welcome.title': 'Привет, Operator',
  'tour.operator.welcome.body': '30-секундный тур по queue-first рабочему месту — очередь, автономия, диспатч.',
  'tour.operator.home.title': 'Главная',
  'tour.operator.home.body': 'День одним взглядом: очереди, ожидающие вердикты, предложения автономии, потребности диспатча.',
  'tour.operator.queue.title': 'Очередь ревью',
  'tour.operator.queue.body': 'Модули и поставки, ждущие вашего вердикта. Триаж, апрув, возврат на доработку.',
  'tour.operator.autonomy.title': 'Автономия',
  'tour.operator.autonomy.body': 'Предложенные действия, ждущие подтверждения человека. Override, approve или пропустите.',
  'tour.operator.dispatch.title': 'Диспатч',
  'tour.operator.dispatch.body': 'Подбор билдеров под открытые модули — по скиллам, ёмкости и репутации. В один тап.',
  'tour.operator.alerts.title': 'Уведомления',
  'tour.operator.alerts.body': 'Застрявшие задачи, перегруженные билдеры, бэклог QA — всё, что требует human nudge.',
};

const UK: Dict = {
  // Generic
  'common.save': 'Зберегти',
  'common.cancel': 'Скасувати',
  'common.retry': 'Повторити',
  'common.loading': 'Завантаження…',
  'common.coming_soon': 'Незабаром',
  'common.ok': 'OK',
  'common.dev_mode': 'DEV режим',

  // Profile
  'profile.title': 'Профіль',
  'profile.you': 'Ви',
  'profile.role.client': 'Клієнт',
  'profile.role.developer': 'Розробник',
  'profile.role.admin': 'Адмін',
  'profile.section.account': 'Акаунт',
  'profile.section.support': 'Підтримка',
  'profile.section.workspace': 'Робочий простір',
  'profile.section.roles': 'Ролі',
  'profile.section.actions': 'Дії',
  'profile.section.insights': 'Аналітика розробника',
  'profile.section.wallet': 'Гаманець',
  'profile.row.account_details': 'Дані акаунта',
  'profile.row.referrals': 'Реферали',
  'profile.row.referrals_earn': 'Реферали — заробляйте 7%',
  'profile.row.documents': 'Документи',
  'profile.row.support': 'Допомога і підтримка',
  'profile.row.replay_tour': 'Повторити welcome-тур',
  'profile.row.switch_role': 'Змінити роль',
  'profile.row.settings': 'Налаштування',
  'profile.row.time_logs': 'Облік часу',
  'profile.row.time_logs_sub': 'Години по ваших завданнях',
  'profile.row.leaderboard': 'Рейтинг',
  'profile.row.leaderboard_sub': 'Ваше місце серед розробників',
  'profile.row.growth': 'Розвиток',
  'profile.row.growth_sub': 'Наскільки ви близькі до наступного рівня',
  'profile.row.projects': 'Мої проєкти',
  'profile.row.work': 'Моя робота',
  'profile.row.admin': 'Центр керування',
  'profile.row.billing': 'Білінг і платежі',
  'profile.stats.projects': 'Проєкти',
  'profile.stats.invested': 'Інвестовано',
  'profile.stats.member': 'Учасник з',
  'profile.stats.building': 'У РОБОТІ',
  'profile.stats.earned': 'ЗАРОБЛЕНО',
  'profile.stats.roles': 'РОЛЕЙ',
  'profile.signout': 'Вийти',
  'profile.signout_confirm': 'Вийти з сесії адміна?',
  'profile.signout_action': 'Вийти',
  'profile.empty.title': 'Оберіть, хто ви',
  'profile.empty.sub': 'Запустіть проєкт або приєднайтесь як розробник — вибір за вами.',
  'profile.empty.cta': 'На головну',
  'profile.wallet.available': 'Доступно',
  'profile.wallet.pending': 'в очікуванні',
  'profile.wallet.withdraw': 'Вивести',
  'profile.role.current': 'Поточне представлення',
  'profile.role.switch_to': 'Перейти до',
  'profile.role.also_have': 'У вас також є доступ як',

  // Settings
  'settings.title': 'Налаштування',
  'settings.section.identity': 'Ідентифікація',
  'settings.section.security': 'Безпека',
  'settings.section.appearance': 'Зовнішній вигляд',
  'settings.section.account': 'Акаунт',
  'settings.edit_profile': 'Змінити ім\'я та аватар',
  'settings.signin_method': 'Спосіб входу',
  'settings.signin_value': 'Email · код OTP',
  'settings.twofa': 'Двофакторна автентифікація',
  'settings.twofa_on': 'Двофакторну автентифікацію увімкнено.',
  'settings.twofa_off': 'Двофакторну автентифікацію вимкнено.',
  'settings.twofa_disable_title': 'Вимкнути 2FA',
  'settings.twofa_disable_msg': 'Введіть 6-значний код з автентифікатора або recovery-код (XXXXX-XXXXX).',
  'settings.change_email': 'Змінити email',
  'settings.theme': 'Тема',
  'settings.theme.dark': 'Темна',
  'settings.theme.light': 'Світла',
  'settings.theme.light_saved': 'Світла тема з\'явиться в наступному релізі. Вибір збережено.',
  'settings.language': 'Мова',
  'settings.language_saved': 'Вибір мови збережено.',
  'settings.export_data': 'Експортувати мої дані',
  'settings.export_msg': 'Ваші дані надішлемо на email протягом 24 годин.',
  'settings.export_ok': 'Файл з вашими даними завантажено.',
  'settings.delete_account': 'Видалити акаунт',
  'settings.delete_msg': 'Видалення потребує підтвердження від підтримки (виплати, активні контракти). Напишіть на support@atlas.dev.',
  'settings.version': 'ATLAS DevOS · v1.0',

  // Errors
  'error.generic': 'Щось пішло не так',
  'error.switch': 'Не вдалося перемкнути',
  'error.copy': 'Не вдалося скопіювати',

  // Onboarding tour — CLIENT
  'tour.client.welcome.title': 'Ласкаво просимо до EVA-X',
  'tour.client.welcome.body': 'Швидко пройдемося по кабінету. 30 секунд — і ви знатимете, де що знаходиться.',
  'tour.client.home.title': 'Головна',
  'tour.client.home.body': 'Ваш дашборд. Активні проєкти з одного погляду, останні події та швидкі дії.',
  'tour.client.projects.title': 'Проєкти',
  'tour.client.projects.body': 'Усі ваші проєкти тут. Тапніть будь-який, щоб побачити scope, команду, віхи та прогрес.',
  'tour.client.activity.title': 'Активність',
  'tour.client.activity.body': 'Реалтайм-стрічка: завершені модулі, рішення від вас, поставки, проведені платежі.',
  'tour.client.billing.title': 'Білінг',
  'tour.client.billing.body': 'Інвойси, ескроу, розстрочки та чеки. Завжди знайте, що сплачено та що попереду.',
  'tour.client.profile.title': 'Профіль',
  'tour.client.profile.body': 'Акаунт, налаштування, реферали, програми та підтримка. Тур можна перезапустити звідси.',
  'tour.client.alerts.title': 'Сповіщення',
  'tour.client.alerts.body': 'Важливі оновлення по ваших проєктах — рішення, виплати, поставки.',
  'tour.client.chat.title': 'Прямий чат',
  'tour.client.chat.body': 'Спілкуйтесь з командою напряму. Контекст проєкту підтягується автоматично.',

  // Onboarding tour — DEVELOPER
  'tour.developer.welcome.title': 'Вітаємо, Builder',
  'tour.developer.welcome.body': 'Короткий тур по робочому простору. 30 секунд — і ви знаєте, де завдання, заробіток та фідбек.',
  'tour.developer.home.title': 'Головна',
  'tour.developer.home.body': 'Фокус дня: призначені модулі, що на рев\'ю, що заблоковано. Все, чим зайнятися сьогодні.',
  'tour.developer.market.title': 'Маркет',
  'tour.developer.market.body': 'Відкриті модулі в пошуку білдера. Фільтр за скілами, scope та ставкою — забирайте підходяще.',
  'tour.developer.acceptance.title': 'Приймання',
  'tour.developer.acceptance.body': 'Модулі, що чекають вердикту QA. Дивіться фідбек, робіть правки, рухайте до shipped.',
  'tour.developer.earnings.title': 'Заробіток',
  'tour.developer.earnings.body': 'Лайв-леджер: утримано, доступно, виплачено. Підключіть спосіб виплат і стежте за кожним центом.',
  'tour.developer.leaderboard.title': 'Лідерборд',
  'tour.developer.leaderboard.body': 'Ваше місце в спільноті білдерів. Ростіть репутацію, відкривайте крутіші модулі.',
  'tour.developer.alerts.title': 'Сповіщення',
  'tour.developer.alerts.body': 'Оновлення модулів, рішення QA, події по виплатах — все, що потребує уваги, тут.',

  // Onboarding tour — TOOLTIP UI
  'tour.ui.next': 'Далі →',
  'tour.ui.back': 'Назад',
  'tour.ui.got_it': 'Зрозуміло',
  'tour.ui.skip': 'Пропустити тур',
  'tour.ui.step_counter': 'Крок {n} з {total}',

  // Onboarding tour — ADMIN
  'tour.admin.welcome.title': 'Вітаємо, Admin',
  'tour.admin.welcome.body': 'Швидка орієнтація в адмін-консолі — pipeline, користувачі, виплати, системні ручки. Менше хвилини.',
  'tour.admin.home.title': 'Головна',
  'tour.admin.home.body': 'Оперативний знімок: активні проєкти, глибина черг, критичні події дня.',
  'tour.admin.pipeline.title': 'Pipeline',
  'tour.admin.pipeline.body': 'Майстер-вʼю кожного запиту від приймання до shipped. Перетягуйте, призначайте білдерів, правте scope.',
  'tour.admin.users.title': 'Користувачі',
  'tour.admin.users.body': 'Клієнти, білдери, тестери, оператори. Ролі, блокування, сесії та аудит — в одному місці.',
  'tour.admin.payouts.title': 'Виплати',
  'tour.admin.payouts.body': 'Воркер, ретраї, dead-letter, розбіжності reconciliation. Money substrate однією панеллю.',
  'tour.admin.alerts.title': 'Сповіщення',
  'tour.admin.alerts.body': 'Критичні події — невдалі виплати, ескальовані тікети, бекл QA — з\'являються тут.',

  // Onboarding tour — OPERATOR
  'tour.operator.welcome.title': 'Вітаємо, Operator',
  'tour.operator.welcome.body': '30-секундний тур по queue-first робочому місцю — черга, автономія, диспатч.',
  'tour.operator.home.title': 'Головна',
  'tour.operator.home.body': 'День одним поглядом: черги, очікувані вердикти, пропозиції автономії, потреби диспатчу.',
  'tour.operator.queue.title': 'Черга рев\'ю',
  'tour.operator.queue.body': 'Модулі та поставки, що чекають вашого вердикту. Тріаж, апрув, повернення на доопрацювання.',
  'tour.operator.autonomy.title': 'Автономія',
  'tour.operator.autonomy.body': 'Запропоновані дії, що чекають на підтвердження людини. Override, approve або пропустіть.',
  'tour.operator.dispatch.title': 'Диспатч',
  'tour.operator.dispatch.body': 'Підбір білдерів під відкриті модулі — за скілами, потужністю і репутацією. В один тап.',
  'tour.operator.alerts.title': 'Сповіщення',
  'tour.operator.alerts.body': 'Застряглі завдання, перевантажені білдери, бекл QA — все, що потребує human nudge.',
};

const DICTS: Record<LangCode, Dict> = { en: EN, ru: RU, uk: UK };

type I18nCtx = {
  lang: LangCode;
  setLang: (next: LangCode, opts?: { syncBackend?: boolean }) => Promise<void>;
  t: (key: string, fallback?: string) => string;
  langs: typeof LANGS;
};

const I18nContext = createContext<I18nCtx>({
  lang: 'en',
  setLang: async () => {},
  t: (k, fb) => fb || k,
  langs: LANGS,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en');

  // Hydrate from AsyncStorage on mount.
  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(STORAGE_KEY);
        if (v === 'en' || v === 'ru' || v === 'uk') setLangState(v);
      } catch {/* ignore */}
    })();
  }, []);

  const setLang = useCallback(async (next: LangCode, opts?: { syncBackend?: boolean }) => {
    setLangState(next);
    try { await AsyncStorage.setItem(STORAGE_KEY, next); } catch {/* ignore */}
    if (opts?.syncBackend !== false) {
      // Best-effort: push preference to backend so it follows the account.
      try { await api.patch('/account/me', { language: next }); } catch {/* unauth or not yet wired — fine */}
    }
  }, []);

  const t = useCallback((key: string, fallback?: string) => {
    const dict = DICTS[lang] || EN;
    return dict[key] ?? EN[key] ?? fallback ?? key;
  }, [lang]);

  const value = useMemo<I18nCtx>(() => ({ lang, setLang, t, langs: LANGS }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  return useContext(I18nContext);
}

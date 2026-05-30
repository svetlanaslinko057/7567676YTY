# Cabinet i18n Coverage — 2026-05-30

**Scope:** 98 cabinet pages under `/app/web/src/pages/` (TARGETS=60 explicit + 38 auto-discovered).

## Summary

- Total `tByEn(...)` calls: **1400**
- Total probable hardcoded EN JSX text nodes: **~419**
- Dictionary EN keys: **1781**
- Dictionary UK keys: **1781**

Heuristic: a "hardcoded" JSX text node is `>...<` content that starts with a letter, has 4–80 chars, contains at least one lowercase, and is not an all-caps tech label. False positives expected; use this to triage.

## Top offenders (most probable hardcoded EN)

| Rank | File | tByEn | Hardcoded≈ | Lines |
|------|------|------:|----------:|-----:|
| 1 | `AdminExecutionIntelligence.js` | 27 | 15 | 1752 |
| 2 | `ClientProjectPage.js` | 53 | 13 | 1303 |
| 3 | `ClientDeliverablePage.js` | 17 | 13 | 584 |
| 4 | `NewRequest.js` | 15 | 13 | 553 |
| 5 | `PortfolioCaseDetail.js` | 14 | 13 | 714 |
| 6 | `AdminReconciliation.js` | 46 | 11 | 688 |
| 7 | `AdminIntegrationsPage.js` | 38 | 10 | 678 |
| 8 | `DeveloperGrowthPage.js` | 32 | 10 | 565 |
| 9 | `ClientProfilePage.js` | 16 | 10 | 421 |
| 10 | `ContractSignEvidencePage.js` | 15 | 10 | 424 |
| 11 | `ClientReferralPage.js` | 13 | 10 | 366 |
| 12 | `AdminPayoutsQueue.js` | 28 | 9 | 457 |
| 13 | `AdminLeadsPage.js` | 12 | 9 | 452 |
| 14 | `EstimateResultPage.js` | 7 | 9 | 557 |
| 15 | `AdminV2Portfolio.js` | 49 | 8 | 854 |
| 16 | `AcceptanceQueue.js` | 18 | 8 | 359 |
| 17 | `DeveloperProfileEnhanced.js` | 13 | 8 | 479 |
| 18 | `DeveloperWorkspace.js` | 12 | 8 | 350 |
| 19 | `WorkUnitDetail.js` | 12 | 8 | 234 |
| 20 | `TwoFactorRecoveryPage.js` | 13 | 7 | 426 |
| 21 | `GPTScopeBuilder.js` | 10 | 7 | 448 |
| 22 | `AdminPricingConfigPanel.js` | 9 | 7 | 550 |
| 23 | `AdminLoginPage.js` | 4 | 7 | 386 |
| 24 | `ClientAuthPage.js` | 4 | 7 | 516 |
| 25 | `ScopeBuilder.js` | 32 | 6 | 688 |
| 26 | `AdminPayoutBatchDetail.js` | 21 | 6 | 417 |
| 27 | `DeveloperDashboard.js` | 19 | 6 | 360 |
| 28 | `ClientEstimatePage.js` | 14 | 6 | 317 |
| 29 | `AdminEarningsControl.js` | 4 | 6 | 371 |
| 30 | `AdminPressureTopology.js` | 2 | 6 | 403 |

## Per-file detail (full list)

### `AdminExecutionIntelligence.js` — tByEn=27 hardcoded≈15

- `Recent decisions`
- `Pick a decision from the stream`
- `to inspect its cognition.`
- `Execution confidence`
- `detected`
- `Select a module to compare`

### `ClientProjectPage.js` — tByEn=53 hardcoded≈13

- `Back to Projects`
- `Project Timeline`
- `Deliverables`
- `Currently in Progress`
- `Need Help?`
- `Questions about your project? Our team is here to help.`

### `ClientDeliverablePage.js` — tByEn=17 hardcoded≈13

- `Try again`
- `Back to Dashboard`
- `Preview`
- `API Docs`
- `No items in this delivery yet.`
- `Pending approval`

### `NewRequest.js` — tByEn=15 hardcoded≈13

- `What do you want`
- `to build?`
- `Describe your idea. AI will find similar past projects to accelerate delivery.`
- `View Similar Projects`
- `Start Project`
- `We found similar projects`

### `PortfolioCaseDetail.js` — tByEn=14 hardcoded≈13

- `Back to home`
- `Order similar`
- `Back to portfolio`
- `Featured`
- `Video walkthrough`
- `Project facts`

### `AdminReconciliation.js` — tByEn=46 hardcoded≈11

- `Mode`
- `Operational Queue`
- `Refresh`
- `Run Now`
- `Filters`
- `No divergences match the current filter.`

### `AdminIntegrationsPage.js` — tByEn=38 hardcoded≈10

- `Admin access required`
- `console.cloud.google.com`
- `here. Authorized JavaScript origins must include your preview URL.`
- `Validate`
- `for testing.`
- `Test connection`

### `DeveloperGrowthPage.js` — tByEn=32 hardcoded≈10

- `Recalculate Score`
- `Next:`
- `Network:`
- `Earnings:`
- `Code:`
- `Clicks:`

### `ClientProfilePage.js` — tByEn=16 hardcoded≈10

- `Saved`
- `Add your full name in`
- `Account details`
- `Edit`
- `Cancel`
- `Email`

### `ContractSignEvidencePage.js` — tByEn=15 hardcoded≈10

- `Back`
- `We only ask for this at the moment of signing your first agreement.`
- `Continue`
- `Project:`
- `Enter the 6-digit code we sent to your email to confirm your signature.`
- `DEV code:`

### `ClientReferralPage.js` — tByEn=13 hardcoded≈10

- `Available`
- `Pending`
- `Lifetime`
- `Referrals`
- `Your Referral Link`
- `Copied!`

### `AdminPayoutsQueue.js` — tByEn=28 hardcoded≈9

- `Worker`
- `Reconciliation`
- `Refresh`
- `Drain Once`
- `No items currently retrying. Queue is healthy.`
- `Retry`

### `AdminLeadsPage.js` — tByEn=12 hardcoded≈9

- `Anonymous estimates`
- `Refresh`
- `Converted to project`
- `by user`
- `Mark contacted`
- `Mark converted`

### `EstimateResultPage.js` — tByEn=7 hardcoded≈9

- `operational review pass`
- `Unlock the full breakdown`
- `Contract-backed`
- `Devs assigned in 24h`
- `Refundable until kickoff`
- `Unlock my full estimate`

### `AdminV2Portfolio.js` — tByEn=49 hardcoded≈8

- `New case`
- `No cases yet. Click`
- `to add one.`
- `Featured`
- `Video`
- `View`

### `AcceptanceQueue.js` — tByEn=18 hardcoded≈8

- `You have`
- `Accept Task`
- `Can't Take`
- `Need Info`
- `Cancel`
- `Confirm Decline`

### `DeveloperProfileEnhanced.js` — tByEn=13 hardcoded≈8

- `Priority in leaderboard`
- `Lost due to revisions`
- `Improve QA pass rate to unlock max potential earnings`
- `Strike Status`
- `Browse Marketplace`
- `Manage 2FA`

### `DeveloperWorkspace.js` — tByEn=12 hardcoded≈8

- `Workspace`
- `Browse Marketplace`
- `Submit Deliverable`
- `Drop Module`
- `QA Review`
- `Cancel`

### `WorkUnitDetail.js` — tByEn=12 hardcoded≈8

- `Back`
- `Estimated`
- `Actual`
- `Reassign`
- `Assign Developer`
- `Approve`

### `TwoFactorRecoveryPage.js` — tByEn=13 hardcoded≈7

- `Enable 2FA`
- `Disable`
- `Regenerate`
- `Revoke all`
- `Cancel`
- `Download`

### `GPTScopeBuilder.js` — tByEn=10 hardcoded≈7

- `AI Scope Builder`
- `Project Idea`
- `Generating...`
- `Generate Scope with AI`
- `Add Task`
- `hours`

### `AdminPricingConfigPanel.js` — tByEn=9 hardcoded≈7

- `These knobs control how`
- `Last updated`
- `Used in the AI-blended pricing path:`
- `multiplier`
- `Default level:`
- `Reset to defaults`

### `AdminLoginPage.js` — tByEn=4 hardcoded≈7

- `Back to home`
- `Command Center`
- `Access the admin dashboard to manage your platform`
- `Forgot password?`
- `Access Dashboard`
- `Demo Admin Access`

### `ClientAuthPage.js` — tByEn=4 hardcoded≈7

- `Back to home`
- `Your estimate is saved`
- `Sign In`
- `Register`
- `Forgot password?`
- `or continue with`

### `ScopeBuilder.js` — tByEn=32 hardcoded≈6

- `Refresh`
- `Add Task`
- `Assign`
- `Review`
- `Request Revision`
- `Approve`

### `AdminPayoutBatchDetail.js` — tByEn=21 hardcoded≈6

- `Back to queue`
- `Batch`
- `Refresh`
- `exhausted`
- `Retry`
- `Kill`

### `DeveloperDashboard.js` — tByEn=19 hardcoded≈6

- `Your Earnings`
- `Browse Marketplace`
- `Your Rating`
- `View Full Profile`
- `Earn More Money`
- `View Full Growth Plan`

### `ClientEstimatePage.js` — tByEn=14 hardcoded≈6

- `Describe your project idea and get a data-driven cost estimate`
- `Analyzing...`
- `Get Instant Estimate`
- `based on similar projects`
- `Start Project`
- `New Estimate`

### `AdminEarningsControl.js` — tByEn=4 hardcoded≈6

- `Earnings Control`
- `Manage developer earnings, batches, and payouts`
- `Refresh`
- `Approved Earnings Queue`
- `QA-Blocked Earnings`
- `Trust-Blocked Earnings`

### `AdminPressureTopology.js` — tByEn=2 hardcoded≈6

- `dominant:`
- `no dominant driver`
- `Pressure Topology`
- `pressure partially derived from replayed cognition traces`
- `return to cognition console`
- `Topology is quiet`

### `AdminTeamPanel.js` — tByEn=39 hardcoded≈5

- `View`
- `Reassign`
- `Refresh Team Data`
- `Auto-Rebalance`
- `Back to Control Center`

### `AdminDeveloperProfile.js` — tByEn=27 hardcoded≈5

- `Team`
- `Refresh`
- `Activity Timeline`
- `Quality Metrics`
- `No active projects`

### `AdminDeliverableBuilder.js` — tByEn=18 hardcoded≈5

- `Back`
- `Add Block`
- `Add Resource`
- `Add links to repos, docs, demos`
- `Send Deliverable to Client`

### `DeveloperWorkPage.js` — tByEn=18 hardcoded≈5

- `Back to Assignments`
- `Start Working`
- `Log Hours`
- `Add another link`
- `Submit for Review`

### `AdminFinancialsPage.js` — tByEn=9 hardcoded≈5

- `Project Financials`
- `Create Invoice`
- `Invoices`
- `Mark Paid`
- `Cancel`

### `DeliverableBuilder.js` — tByEn=8 hardcoded≈5

- `Back to Admin`
- `Back`
- `Add Link`
- `Cancel`
- `Create Deliverable`

### `AdminV2Profile.js` — tByEn=7 hardcoded≈5

- `System snapshot`
- `Permissions`
- `Security`
- `Manage`
- `Logout`

### `ClientTransparency.js` — tByEn=6 hardcoded≈5

- `Refresh`
- `Continue to next milestone`
- `Auto-continue milestones`
- `shipped`
- `in motion`

### `TwoFactorSetupPage.js` — tByEn=5 hardcoded≈5

- `Not now`
- `Cancel`
- `once`
- `Download .txt`
- `I have saved these codes somewhere safe.`

### `AdminV2Team.js` — tByEn=4 hardcoded≈5

- `Load Balance`
- `Rebalance all`
- `Rebalance`
- `Overview`
- `Users`

### `AdminV2Workflow.js` — tByEn=3 hardcoded≈5

- `Approve`
- `Revision`
- `Reject`
- `Details`
- `Refresh`

### `DeveloperLeaderboard.js` — tByEn=13 hardcoded≈4

- `Leaderboard`
- `Quality`
- `Earnings`
- `Speed`

### `ExecutorBoard.js` — tByEn=12 hardcoded≈4

- `Cancel`
- `Revision required`
- `Open`
- `Start`

### `AdminLegalSettings.js` — tByEn=9 hardcoded≈4

- `Unsaved changes`
- `All changes saved`
- `Reload`
- `Reset to server copy`

### `AdminV2Finance.js` — tByEn=6 hardcoded≈4

- `Refresh`
- `Approve`
- `Reject`
- `Payouts Queue`

### `BuilderAuthPage.js` — tByEn=4 hardcoded≈4

- `Back to home`
- `Forgot password?`
- `or continue with`
- `Try Demo Workspace`

### `AdminPricingCalibration.js` — tByEn=2 hardcoded≈4

- `Minimum sample size`
- `Lower the minimum sample size, or wait for more projects to complete.`
- `Current:`
- `Open in pricing config`

### `DescribeFlow.js` — tByEn=0 hardcoded≈4

- `Back`
- `Tell us about your product.`
- `A couple of things to clarify:`
- `Three ways to start`

### `ProjectBootingPage.js` — tByEn=0 hardcoded≈4

- `Creating your product`
- `The system has already started working.`
- `Live activity`
- `You will land in your workspace in a moment.`

### `AdminMarketplaceQuality.js` — tByEn=19 hardcoded≈3

- `Restore`
- `Flag`
- `Limit`

### `ClientSupport.js` — tByEn=14 hardcoded≈3

- `New Ticket`
- `Create Your First Ticket`
- `Cancel`

### `DeveloperEarnings.js` — tByEn=10 hardcoded≈3

- `Earnings`
- `Track your task earnings and payout status`
- `Refresh`

### `TesterValidationPage.js` — tByEn=9 hardcoded≈3

- `QA Validation`
- `Start Validation`
- `Add Issue`

### `DeveloperMarketplace.js` — tByEn=7 hardcoded≈3

- `Marketplace`
- `Start Working`
- `Release`

### `ClientBillingOS.js` — tByEn=6 hardcoded≈3

- `Pending Invoices`
- `Paid Invoices`
- `Paid`

### `ClientProjects.js` — tByEn=6 hardcoded≈3

- `Create Project`
- `Cancel`
- `Open`

### `ClientVersionsPage.js` — tByEn=4 hardcoded≈3

- `Try again`
- `Dashboard`
- `Versions will appear here as they are delivered`

### `TesterHub.js` — tByEn=4 hardcoded≈3

- `Next Validation`
- `Start Validation`
- `Recent Activity`

### `TwoFactorChallengePage.js` — tByEn=4 hardcoded≈3

- `Signing in to`
- `Authenticator`
- `Recovery code`

### `DeveloperTimeControl.js` — tByEn=1 hardcoded≈3

- `Retry`
- `Back to Workspace`
- `Time Control Panel`

### `AdminTemplatesPage.js` — tByEn=15 hardcoded≈2

- `Add Template`
- `Cancel`

### `DevWork.js` — tByEn=14 hardcoded≈2

- `Claim`
- `paused by system`

### `ClientDashboardOS.js` — tByEn=13 hardcoded≈2

- `Client Operating Workspace`
- `View All Invoices`

### `ClientProjectWorkspaceOS.js` — tByEn=10 hardcoded≈2

- `Preview`
- `Request Fix`

### `ValidatorMissionsPage.js` — tByEn=9 hardcoded≈2

- `Human Validation Program`
- `Open preview to review`

### `DeveloperIntelGrowth.js` — tByEn=7 hardcoded≈2

- `You earn`
- `per module`

### `ClientContractPage.js` — tByEn=5 hardcoded≈2

- `Back`
- `Open project workspace`

### `ClientCosts.js` — tByEn=5 hardcoded≈2

- `Real-time view of what you're spending and earning.`
- `Pause module`

### `ClientDocumentsPage.js` — tByEn=5 hardcoded≈2

- `Signed agreements, invoices, payment confirmations and project snapshots.`
- `Signed`

### `AdminQAPage.js` — tByEn=4 hardcoded≈2

- `Refresh`
- `Open details`

### `AdminV2System.js` — tByEn=3 hardcoded≈2

- `Refresh`
- `No audit records yet. System actions are logged here as they happen.`

### `ClientLeaderboardPage.js` — tByEn=2 hardcoded≈2

- `your score`
- `No rankings yet. Be the first!`

### `LandingPage.js` — tByEn=59 hardcoded≈1

- `v1.0`

### `LandingPageLight.js` — tByEn=58 hardcoded≈1

- `v1.0`

### `ClientHub.js` — tByEn=30 hardcoded≈1

- `View Projects`

### `AdminProjectReprice.js` — tByEn=16 hardcoded≈1

- `Select project`

### `ProjectDetails.js` — tByEn=11 hardcoded≈1

- `Back to Dashboard`

### `DeveloperPerformance.js` — tByEn=8 hardcoded≈1

- `hours`

### `CreateModuleDominance.js` — tByEn=7 hardcoded≈1

- `Price will be locked after confirmation`

### `DeveloperIntelFeedback.js` — tByEn=6 hardcoded≈1

- `Complete a module and QA will leave actionable notes here.`

### `ClientOperator.js` — tByEn=5 hardcoded≈1

- `Portfolio-level view of project risk.`

### `DeveloperWorkspaceV2.js` — tByEn=44 hardcoded≈0
### `UnifiedAuthPage.js` — tByEn=39 hardcoded≈0
### `AdminPaymentsPage.js` — tByEn=38 hardcoded≈0
### `AdminValidationPage.js` — tByEn=25 hardcoded≈0
### `AdminUsersPage.js` — tByEn=24 hardcoded≈0
### `ClientCabinet.js` — tByEn=24 hardcoded≈0
### `AdminV2Dashboard.js` — tByEn=20 hardcoded≈0
### `AdminWithdrawalsPage.js` — tByEn=11 hardcoded≈0
### `TesterPerformance.js` — tByEn=10 hardcoded≈0
### `ClientWorkspace.js` — tByEn=7 hardcoded≈0
### `DeveloperIntelLeaderboard.js` — tByEn=6 hardcoded≈0
### `AdminSystemUsers.js` — tByEn=5 hardcoded≈0
### `TesterIssues.js` — tByEn=5 hardcoded≈0
### `DeveloperAssignments.js` — tByEn=4 hardcoded≈0
### `TesterValidationList.js` — tByEn=2 hardcoded≈0
### `ProviderAuth.js` — tByEn=1 hardcoded≈0
### `ProviderInbox.js` — tByEn=0 hardcoded≈0

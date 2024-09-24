import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoursesComponent } from './components/admin-dashboard/admin-courses/admin-courses.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './components/admin-dashboard/admin-profile/admin-profile.component';
import { AdminPurchaseHistoryComponent } from './components/admin-dashboard/admin-purchase-history/admin-purchase-history.component';
import { AdminSettingsComponent } from './components/admin-dashboard/admin-settings/admin-settings.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { InstructorAddCoursesComponent } from './components/admin-dashboard/instructor-add-courses/instructor-add-courses.component';
import { InstructorCoursesComponent } from './components/instructor-dashboard/instructor-courses/instructor-courses.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard/instructor-dashboard.component';
import { InstructorEarningsComponent } from './components/instructor-dashboard/instructor-earnings/instructor-earnings.component';
import { InstructorProfileComponent } from './components/instructor-dashboard/instructor-profile/instructor-profile.component';
import { InstructorPurchaseHistoryComponent } from './components/instructor-dashboard/instructor-purchase-history/instructor-purchase-history.component';
import { InstructorSettingsComponent } from './components/instructor-dashboard/instructor-settings/instructor-settings.component';
import { InstructorWithdrawComponent } from './components/instructor-dashboard/instructor-withdraw/instructor-withdraw.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BecomeAnInstrutorPageComponent as BecomeAnInstructorPageComponent } from './components/pages/become-an-instrutor-page/become-an-instrutor-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { ComingSoonPageComponent } from './components/pages/coming-soon-page/coming-soon-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { CoursesDetailsPageComponent } from './components/pages/courses-details-page/courses-details-page.component';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { EventsDetailsPageComponent } from './components/pages/events-details-page/events-details-page.component';
import { EventsPageComponent } from './components/pages/events-page/events-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { InstructorsPageComponent } from './components/pages/instructors-page/instructors-page.component';
import { InstructorsProfilePageComponent } from './components/pages/instructors-profile-page/instructors-profile-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { RegisterPageComponent } from './components/admin-dashboard/register-page/register-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { ZoomMeetingsPageComponent } from './components/pages/zoom-meetings-page/zoom-meetings-page.component';
import { UserCoursesComponent } from './components/user-dashboard/user-courses/user-courses.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user-dashboard/user-profile/user-profile.component';
import { UserPurchaseHistoryComponent } from './components/user-dashboard/user-purchase-history/user-purchase-history.component';
import { UserReviewsComponent } from './components/user-dashboard/user-reviews/user-reviews.component';
import { UserSettingsComponent } from './components/user-dashboard/user-settings/user-settings.component';
import { adminGuard } from './auth/guard/admin.guard';
import { DeveloperGuard } from './auth/developer_guard/developer-guard.guard';
import { TeamLeadGuard } from './auth/team_lead_guard/teamlead-guard.guard';
import { TeamDetailsComponent } from './components/instructor-dashboard/team-details/team-details.component';
import { AddTeamComponent } from './components/admin-dashboard/instructor-add-team/add-team.component';
import { LearningTrackComponent } from './components/user-dashboard/learning-track/learning-track.component';
import { ActiveCourseComponent } from './components/user-dashboard/active-course/active-course.component';
import { AdminTeamsComponent } from './components/admin-dashboard/admin-teams/admin-teams.component';
import { TaskTrackComponent } from './components/user-dashboard/task-track/task-track.component';
import { SubCourseComponent } from './components/user-dashboard/sub-course/sub-course.component';
import { AdminTeamDetailsComponent } from './components/admin-dashboard/admin-team-details/admin-team-details.component';
import { AdminCourseDetailsComponent } from './components/admin-dashboard/admin-course-details/admin-course-details.component';
import { AdminEmployeesComponent } from './components/admin-dashboard/admin-employees/admin-employees.component';
import { DeveloperEmployeesComponent } from './components/admin-dashboard/developer-employees/developer-employees.component';
import { TeamleadEmployeesComponent } from './components/admin-dashboard/teamlead-employees/teamlead-employees.component';
import { TesterEmployeesComponent } from './components/admin-dashboard/tester-employees/tester-employees.component';
import { MyTeamComponent } from './components/user-dashboard/my-team/my-team.component';
import { AssignTasksComponent } from './components/instructor-dashboard/assign-tasks/assign-tasks.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { SessionsPageComponent } from './components/instructor-dashboard/sessions-page/sessions-page.component';
import { AdminEventsComponent } from './components/admin-dashboard/admin-events/admin-events.component';

import { AdminSupportRequestComponent } from './components/admin-dashboard/admin-support-request/admin-support-request.component';
import { SupportRequestDetailsComponent } from './components/admin-dashboard/support-request-details/support-request-details.component';
import { AdminEventListComponent } from './components/admin-dashboard/admin-event-list/admin-event-list.component';
import { AdminEventUpdateComponent } from './components/admin-dashboard/admin-event-update/admin-event-update.component';
import { AdminEventDetailsComponent } from './components/admin-dashboard/admin-event-details/admin-event-details.component';

import { AttendanceTrackComponent } from './components/user-dashboard/attendance-track/attendance-track.component';
import { UserCreateRequestComponent } from './components/user-dashboard/user-create-request/user-create-request.component';
import { UserRequestDetailsComponent } from './components/user-dashboard/user-request-details/user-request-details.component';
import { UserRequestUpdateComponent } from './components/user-dashboard/user-request-update/user-request-update.component';
import { UserRequestListComponent } from './components/user-dashboard/user-request-list/user-request-list.component';
import { UserEventDetailsComponent } from './components/user-dashboard/user-event-details/user-event-details.component';
import { UserEventListComponent } from './components/user-dashboard/user-event-list/user-event-list.component';
import { InstructorTeamsComponent } from './components/instructor-dashboard/instructor-teams/instructor-teams.component';
import { LeaveRequestComponent } from './components/instructor-dashboard/leave-request/leave-request.component';
import { UserLeaveRequestComponent } from './components/user-dashboard/user-leave-request/user-leave-request.component';
import { LeavesComponentComponent } from './components/admin-dashboard/leaves/leaves-component';
import { TeamleadAttendanceTrackComponent } from './components/instructor-dashboard/teamlead-attendance-track/teamlead-attendance-track.component';
import { RmsNavbarComponent } from './components/rms_component/rms-navbar/rms-navbar.component';
import { RmsInterviewComponent } from './components/rms_component/rms-interview/rms-interview.component';
import { rmsAdminGuard } from './auth/rms_admin_guard/rms-admin.guard';
import { BdmClientComponent } from './components/bdm_component/bdm-client/bdm-client.component';
import { BdmNavbarComponent } from './components/bdm_component/bdm-navbar/bdm-navbar.component';
import { bdmGuard } from './auth/bdm_guard/bdm.guard';
import { BdmSettingComponent } from './components/bdm_component/bdm-setting/bdm-setting.component';
import { BdmDeplComponent } from './components/bdm_component/bdm-depl/bdm-depl.component';



import { EmployeeReviewComponent } from './components/instructor-dashboard/employee-review/employee-review.component';
import { MeetingsComponent } from './components/instructor-dashboard/meetings/meetings.component';
import { RmsScheduledInterviewsComponent } from './components/rms_component/rms-scheduled-interviews/rms-scheduled-interviews.component';
import { RmsOnboardingProcessComponent } from './components/rms_component/rms-onboarding-process/rms-onboarding-process.component';
import { RmsDocumentVerificationComponent } from './components/rms_component/rms-document-verification/rms-document-verification.component';
import { ObservationComponent } from './components/instructor-dashboard/observation/observation.component';
import { BdmDetailsComponent } from './components/bdm_component/bdm-details/bdm-details.component';
import { BdmInformationComponent } from './components/bdm_component/bdm-information/bdm-information.component';
import { RmsEmployeesComponent } from './components/rms_component/rms-employees/rms-employees.component';
import { EmployeeInterviewDetailsComponent } from './components/rms_component/employee-interview-details/employee-interview-details.component';
// import { BdmDetailsComponent } from './components/bdm_component/bdm-details/bdm-details.component';
// import { ObservationComponent } from './components/instructor-dashboard/observation/observation.component';
// import { MeetingsComponent } from './components/instructor-dashboard/meetings/meetings.component';
// import { EmployeeReviewComponent } from './components/instructor-dashboard/employee-review/employee-review.component';
// import { RmsDocumentVerificationComponent } from './components/rms_component/rms-document-verification/rms-document-verification.component';
// import { RmsOnboardingProcessComponent } from './components/rms_component/rms-onboarding-process/rms-onboarding-process.component';
// import { RmsScheduledInterviewsComponent } from './components/rms_component/rms-scheduled-interviews/rms-scheduled-interviews.component';


const routes: Routes = [
  { path: '', component: HomeDemoOneComponent },
  { path: 'index-2', component: HomeDemoTwoComponent },
  { path: 'index-3', component: HomeDemoThreeComponent },
  { path: 'courses', component: CoursesPageComponent },

  { path: 'about', component: AboutPageComponent },
  { path: 'instructors', component: InstructorsPageComponent },
  { path: 'instructor-profile', component: InstructorsProfilePageComponent },
  { path: 'become-an-instructor', component: BecomeAnInstructorPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'event-details', component: EventsDetailsPageComponent },
  { path: 'zoom-meetings', component: ZoomMeetingsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
  { path: 'terms-conditions', component: TermsConditionsPageComponent },
  { path: 'pricing', component: PricingPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'blog-details', component: BlogDetailsPageComponent },
  { path: 'coming-soon', component: ComingSoonPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'instructor-dashboard', component: InstructorDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'chat-bot', component: ChatBotComponent },

  {
    path: 'bdm-client',
    component: BdmClientComponent,
    canActivate: [bdmGuard],
  },
  {
    path: 'bdm-information',
    component: BdmInformationComponent,
    canActivate: [bdmGuard],
  },
 
  {
    path: 'bdm-details',
    component: BdmDetailsComponent,
    canActivate: [bdmGuard],
  },
  {
    path: 'bdm-deal',
    component: BdmDeplComponent,
    canActivate: [bdmGuard],
  },
  {
    path: 'bdm-setting',
    component: BdmSettingComponent,
    canActivate: [bdmGuard],
  },

  {
    path: 'chat-bot',
    component: ChatBotComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'sessions-page',
    component: SessionsPageComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-courses',
    component: AdminCoursesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-course-details/:courseName',
    component: AdminCourseDetailsComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin-employees',
    component: AdminEmployeesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'developer-employees',
    component: DeveloperEmployeesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'teamlead-employees',
    component: TeamleadEmployeesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'tester-employees',
    component: TesterEmployeesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-teams',
    component: AdminTeamsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-team-details/:teamName',
    component: AdminTeamDetailsComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin-purchase-history',
    component: AdminPurchaseHistoryComponent,
  },
  {
    path: 'admin-settings',
    component: AdminSettingsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin-events',
    component: AdminEventsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-event-list',
    component: AdminEventListComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-event-update/:eventId',
    component: AdminEventUpdateComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-event-details/:eventId',
    component: AdminEventDetailsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-support-request',
    component: AdminSupportRequestComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'support-request-details/:ticketId',
    component: SupportRequestDetailsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'leaves',
    component: LeavesComponentComponent,
    canActivate: [adminGuard],
  },
  // User dashboard

  {
    path: 'attendance-Track',
    component: AttendanceTrackComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'course-details',
    component: CoursesDetailsPageComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'active-courses',
    component: ActiveCourseComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-course',
    component: UserCoursesComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-enrolled-courses',
    component: UserCoursesComponent,
    canActivate: [DeveloperGuard],
  },
  { path: 'user-purchase-history', component: UserPurchaseHistoryComponent },
  {
    path: 'user-settings',
    component: UserSettingsComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-reviews',
    component: UserReviewsComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'learning-track',
    component: LearningTrackComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'Task-Track',
    component: TaskTrackComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'sub-course/:duration',
    component: SubCourseComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'my-Team',
    component: MyTeamComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-event-details/:eventId',
    component: UserEventDetailsComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-event-list',
    component: UserEventListComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-create-request',
    component: UserCreateRequestComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-request-details/:ticketId',
    component: UserRequestDetailsComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-request-list',
    component: UserRequestListComponent,
    canActivate: [DeveloperGuard],
  },
  {
    path: 'user-request-update/:ticketId',
    component: UserRequestUpdateComponent,

    canActivate: [DeveloperGuard],
  },

  {
    path: 'user-leave-request',
    component: UserLeaveRequestComponent,
    canActivate: [DeveloperGuard],
  },

  // Instructor dashboard
  {
    path: 'instructor-dashboard',
    component: InstructorDashboardComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'teamlead-attendance-track',
    component: TeamleadAttendanceTrackComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'leave-request',
    component: LeaveRequestComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-teams',
    component: InstructorTeamsComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-dashboard-profile',
    component: InstructorProfileComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-courses',
    component: InstructorCoursesComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'add-courses',
    component: InstructorAddCoursesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'add-team',
    component: AddTeamComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'assign-tasks',
    component: AssignTasksComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-purchase-history',
    component: InstructorPurchaseHistoryComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'observation',
    component: ObservationComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-earnings',
    component: InstructorEarningsComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-withdraw',
    component: InstructorWithdrawComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-employees',
    component: InstructorTeamsComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'instructor-settings',
    component: InstructorSettingsComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'team/:teamName',
    component: TeamDetailsComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'employee-review',
    component: EmployeeReviewComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'meetings',
    component: MeetingsComponent,
    canActivate: [TeamLeadGuard],
  },
  {
    path: 'rms-navbar',
    component: RmsNavbarComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'rms-interview',
    component: RmsInterviewComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'scheduled-interviews',
    component: RmsScheduledInterviewsComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'onboarding-process',
    component: RmsOnboardingProcessComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'document-verification',
    component: RmsDocumentVerificationComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'rms-employees',
    component: EmployeeInterviewDetailsComponent,
    canActivate: [rmsAdminGuard],
  },
  {

    path: 'scheduled-interviews',
    component: RmsScheduledInterviewsComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'onboarding-process',
    component: RmsOnboardingProcessComponent,
    canActivate: [rmsAdminGuard],
  },
  {
    path: 'document-verification',
    component: RmsDocumentVerificationComponent,
    canActivate: [rmsAdminGuard],
  },
  {


    path:'bdm-navbar',
    component:BdmNavbarComponent,
    canActivate:[bdmGuard]

  },
  { path: 'notfound', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SubscribeComponent } from './components/common/subscribe/subscribe.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { TestimonialsComponent } from './components/common/testimonials/testimonials.component';
import { InstructorsComponent } from './components/common/instructors/instructors.component';
import { GetStartedComponent } from './components/common/get-started/get-started.component';
import { UpcomingEventsComponent } from './components/common/upcoming-events/upcoming-events.component';
import { AchievementComponent } from './components/common/achievement/achievement.component';
import { GetRegisterComponent } from './components/common/get-register/get-register.component';
import { PartnerComponent } from './components/common/partner/partner.component';
import { CoursesComponent } from './components/common/courses/courses.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { FeaturesComponent } from './components/common/features/features.component';
import { HomeoneBannerComponent } from './components/pages/home-demo-one/homeone-banner/homeone-banner.component';
import { AboutComponent } from './components/common/about/about.component';
import { HometwoBannerComponent } from './components/pages/home-demo-two/hometwo-banner/hometwo-banner.component';
import { FaqComponent } from './components/common/faq/faq.component';
import { HomethreeBannerComponent } from './components/pages/home-demo-three/homethree-banner/homethree-banner.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { CoursesDetailsPageComponent } from './components/pages/courses-details-page/courses-details-page.component';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { WidgetSidebarComponent } from './components/common/widget-sidebar/widget-sidebar.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/admin-dashboard/register-page/register-page.component';
import { EventsPageComponent } from './components/pages/events-page/events-page.component';
import { EventsDetailsPageComponent } from './components/pages/events-details-page/events-details-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { ZoomMeetingsPageComponent } from './components/pages/zoom-meetings-page/zoom-meetings-page.component';
import { InstructorsPageComponent } from './components/pages/instructors-page/instructors-page.component';
import { InstructorsProfilePageComponent } from './components/pages/instructors-profile-page/instructors-profile-page.component';
import { BecomeAnInstrutorPageComponent } from './components/pages/become-an-instrutor-page/become-an-instrutor-page.component';
import { ComingSoonPageComponent } from './components/pages/coming-soon-page/coming-soon-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './components/admin-dashboard/admin-navbar/admin-navbar.component';
import { AdminProfileComponent } from './components/admin-dashboard/admin-profile/admin-profile.component';
import { AdminCoursesComponent } from './components/admin-dashboard/admin-courses/admin-courses.component';
import { AdminPurchaseHistoryComponent } from './components/admin-dashboard/admin-purchase-history/admin-purchase-history.component';
import { AdminSettingsComponent } from './components/admin-dashboard/admin-settings/admin-settings.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard/user-dashboard.component';
import { UserNavbarComponent } from './components/user-dashboard/user-navbar/user-navbar.component';
import { UserCoursesComponent } from './components/user-dashboard/user-courses/user-courses.component';
import { UserProfileComponent } from './components/user-dashboard/user-profile/user-profile.component';
import { UserPurchaseHistoryComponent } from './components/user-dashboard/user-purchase-history/user-purchase-history.component';
import { UserSettingsComponent } from './components/user-dashboard/user-settings/user-settings.component';
import { UserReviewsComponent } from './components/user-dashboard/user-reviews/user-reviews.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard/instructor-dashboard.component';
import { InstructorNavbarComponent } from './components/instructor-dashboard/instructor-navbar/instructor-navbar.component';
import { InstructorCoursesComponent } from './components/instructor-dashboard/instructor-courses/instructor-courses.component';
import { InstructorAddCoursesComponent } from './components/admin-dashboard/instructor-add-courses/instructor-add-courses.component';
import { InstructorProfileComponent } from './components/instructor-dashboard/instructor-profile/instructor-profile.component';
import { InstructorPurchaseHistoryComponent } from './components/instructor-dashboard/instructor-purchase-history/instructor-purchase-history.component';
import { InstructorEarningsComponent } from './components/instructor-dashboard/instructor-earnings/instructor-earnings.component';
import { InstructorWithdrawComponent } from './components/instructor-dashboard/instructor-withdraw/instructor-withdraw.component';
import { InstructorSettingsComponent } from './components/instructor-dashboard/instructor-settings/instructor-settings.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './auth/interceptor/auth-interceptor.interceptor';
import { AddTeamComponent } from './components/admin-dashboard/instructor-add-team/add-team.component';
import { TeamDetailsComponent } from './components/instructor-dashboard/team-details/team-details.component';
import { AdminEmployeesComponent } from './components/admin-dashboard/admin-employees/admin-employees.component';
import { TeamleadEmployeesComponent } from './components/admin-dashboard/teamlead-employees/teamlead-employees.component';
import { DeveloperEmployeesComponent } from './components/admin-dashboard/developer-employees/developer-employees.component';
import { TesterEmployeesComponent } from './components/admin-dashboard/tester-employees/tester-employees.component';
import { ActiveCourseComponent } from './components/user-dashboard/active-course/active-course.component';
import { LearningTrackComponent } from './components/user-dashboard/learning-track/learning-track.component';
import { TaskTrackComponent } from './components/user-dashboard/task-track/task-track.component';
import { CourseDetailModalComponent } from './components/instructor-dashboard/course-detail-modal/course-detail-modal.component';
import { SubCourseComponent } from './components/user-dashboard/sub-course/sub-course.component';
import { AdminTeamDetailsComponent } from './components/admin-dashboard/admin-team-details/admin-team-details.component';
import { AdminCourseDetailsComponent } from './components/admin-dashboard/admin-course-details/admin-course-details.component';
import { AdminTeamsComponent } from './components/admin-dashboard/admin-teams/admin-teams.component';
import { MyTeamComponent } from './components/user-dashboard/my-team/my-team.component';
import { AssignTasksComponent } from './components/instructor-dashboard/assign-tasks/assign-tasks.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { SessionsPageComponent } from './components/instructor-dashboard/sessions-page/sessions-page.component';

import { AdminEventsComponent } from './components/admin-dashboard/admin-events/admin-events.component';



import { AdminSupportRequestComponent } from './components/admin-dashboard/admin-support-request/admin-support-request.component';
import { SupportRequestDetailsComponent } from './components/admin-dashboard/support-request-details/support-request-details.component';

import { AdminEventDetailsComponent } from './components/admin-dashboard/admin-event-details/admin-event-details.component';
import { AdminEventUpdateComponent } from './components/admin-dashboard/admin-event-update/admin-event-update.component';
import { AdminEventListComponent } from './components/admin-dashboard/admin-event-list/admin-event-list.component';
import { DatePipe } from '@angular/common';

import { AttendanceTrackComponent } from './components/user-dashboard/attendance-track/attendance-track.component';
import { UserCreateRequestComponent } from './components/user-dashboard/user-create-request/user-create-request.component';
import { UserRequestListComponent } from './components/user-dashboard/user-request-list/user-request-list.component';
import { UserRequestDetailsComponent } from './components/user-dashboard/user-request-details/user-request-details.component';
import { UserRequestUpdateComponent } from './components/user-dashboard/user-request-update/user-request-update.component';
import { UserEventListComponent } from './components/user-dashboard/user-event-list/user-event-list.component';
import { UserEventDetailsComponent } from './components/user-dashboard/user-event-details/user-event-details.component';
import { UserRequestComponent } from './components/user-dashboard/user-request/user-request.component';
import { InstructorTeamsComponent } from './components/instructor-dashboard/instructor-teams/instructor-teams.component';
import { LeaveRequestComponent } from './components/instructor-dashboard/leave-request/leave-request.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserLeaveRequestComponent } from './components/user-dashboard/user-leave-request/user-leave-request.component';
import { LeavesComponentComponent } from './components/admin-dashboard/leaves/leaves-component';
import { TeamleadAttendanceTrackComponent } from './components/instructor-dashboard/teamlead-attendance-track/teamlead-attendance-track.component';
import { RmsInterviewComponent } from './components/rms_component/rms-interview/rms-interview.component';
import { RmsNavbarComponent } from './components/rms_component/rms-navbar/rms-navbar.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeDemoOneComponent,
        HomeDemoTwoComponent,
        HomeDemoThreeComponent,
        FooterComponent,
        NavbarComponent,
        SubscribeComponent,
        BlogComponent,
        TestimonialsComponent,
        InstructorsComponent,
        GetStartedComponent,
        UpcomingEventsComponent,
        AchievementComponent,
        GetRegisterComponent,
        PartnerComponent,
        CoursesComponent,
        CategoriesComponent,
        FeaturesComponent,
        HomeoneBannerComponent,
        AboutComponent,
        HometwoBannerComponent,
        FaqComponent,
        HomethreeBannerComponent,
        ContactPageComponent,
        BlogPageComponent,
        BlogDetailsPageComponent,
        CoursesDetailsPageComponent,
        CoursesPageComponent,
        NotFoundComponent,
        WidgetSidebarComponent,
        FaqPageComponent,
        PricingPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        EventsPageComponent,
        EventsDetailsPageComponent,
        AboutPageComponent,
        PrivacyPolicyPageComponent,
        TermsConditionsPageComponent,
        ZoomMeetingsPageComponent,
        InstructorsPageComponent,
        InstructorsProfilePageComponent,
        BecomeAnInstrutorPageComponent,
        ComingSoonPageComponent,
        AdminDashboardComponent,
        AdminNavbarComponent,
        AdminProfileComponent,
        AdminCoursesComponent,
        AdminPurchaseHistoryComponent,
        AdminSettingsComponent,
        UserDashboardComponent,
        UserNavbarComponent,
        UserCoursesComponent,
        UserProfileComponent,
        UserPurchaseHistoryComponent,
        UserSettingsComponent,
        UserReviewsComponent,
        InstructorDashboardComponent,
        InstructorNavbarComponent,
        InstructorCoursesComponent,
        InstructorAddCoursesComponent,
        InstructorProfileComponent,
        InstructorPurchaseHistoryComponent,
        InstructorEarningsComponent,
        InstructorWithdrawComponent,
        InstructorSettingsComponent,
        AddTeamComponent,
        TeamDetailsComponent,
        AdminEmployeesComponent,
        TeamleadEmployeesComponent,
        DeveloperEmployeesComponent,
        TesterEmployeesComponent,
        ActiveCourseComponent,
        LearningTrackComponent,
        TaskTrackComponent,
        CourseDetailModalComponent,
        SubCourseComponent,
        AdminTeamDetailsComponent,
        AdminCourseDetailsComponent,
        AdminTeamsComponent,
        MyTeamComponent,
        AssignTasksComponent,
        ChatBotComponent,
        SessionsPageComponent,
        InstructorTeamsComponent,

        AdminEventsComponent,

        

        AdminSupportRequestComponent,
        SupportRequestDetailsComponent,
        
        AdminEventDetailsComponent,
        AdminEventUpdateComponent,
        AdminEventListComponent,

        AttendanceTrackComponent,
        UserRequestComponent,

          UserCreateRequestComponent,
          UserRequestListComponent,
          UserRequestDetailsComponent,
          UserRequestUpdateComponent,
          UserEventListComponent,
          UserEventDetailsComponent,
          LeaveRequestComponent,
          UserLeaveRequestComponent,
          LeavesComponentComponent,
          TeamleadAttendanceTrackComponent,
          RmsInterviewComponent,
          RmsNavbarComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        NgxScrollTopModule,
        CountUpModule,
        HttpClientModule,
        MatSnackBarModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
        [DatePipe],
    ],
    
    bootstrap: [AppComponent]
})
export class AppModule {}
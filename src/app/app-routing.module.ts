import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoursesComponent } from './components/admin-dashboard/admin-courses/admin-courses.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './components/admin-dashboard/admin-profile/admin-profile.component';
import { AdminPurchaseHistoryComponent } from './components/admin-dashboard/admin-purchase-history/admin-purchase-history.component';
import { AdminSettingsComponent } from './components/admin-dashboard/admin-settings/admin-settings.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { InstructorAddCoursesComponent } from './components/instructor-dashboard/instructor-add-courses/instructor-add-courses.component';
import { InstructorCoursesComponent } from './components/instructor-dashboard/instructor-courses/instructor-courses.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard/instructor-dashboard.component';
import { InstructorEarningsComponent } from './components/instructor-dashboard/instructor-earnings/instructor-earnings.component';
import { InstructorProfileComponent } from './components/instructor-dashboard/instructor-profile/instructor-profile.component';
import { InstructorPurchaseHistoryComponent } from './components/instructor-dashboard/instructor-purchase-history/instructor-purchase-history.component';
import { InstructorSettingsComponent } from './components/instructor-dashboard/instructor-settings/instructor-settings.component';
import { InstructorStudentsComponent } from './components/instructor-dashboard/instructor-students/instructor-students.component';
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

const routes: Routes = [
    {path: '', component: HomeDemoOneComponent},
    {path: 'index-2', component: HomeDemoTwoComponent},
    {path: 'index-3', component: HomeDemoThreeComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'courses-details', component: CoursesDetailsPageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'instructors', component: InstructorsPageComponent},
    {path: 'instructor-profile', component: InstructorsProfilePageComponent},
    {path: 'become-an-instructor', component: BecomeAnInstructorPageComponent},
    {path: 'events', component: EventsPageComponent},
    {path: 'event-details', component: EventsDetailsPageComponent},
    {path: 'zoom-meetings', component: ZoomMeetingsPageComponent},
    {path: 'login', component: LoginPageComponent},
   
    {path: 'faq', component: FaqPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'coming-soon', component: ComingSoonPageComponent},
    {path: 'contact', component: ContactPageComponent},

    // Admin dashboard
    {path: 'admin-dashboard', component: AdminDashboardComponent,canActivate:[adminGuard]},
    {path: 'admin-profile', component: AdminProfileComponent,canActivate:[adminGuard]},
    {path: 'admin-courses', component: AdminCoursesComponent,canActivate:[adminGuard]},
    {path: 'admin-purchase-history', component: AdminPurchaseHistoryComponent},
    {path: 'admin-settings', component: AdminSettingsComponent,canActivate:[adminGuard]},
    {path: 'register', component: RegisterPageComponent,canActivate:[adminGuard]},

    // User dashboard
    {path: 'user-dashboard', component: UserDashboardComponent,canActivate:[DeveloperGuard]},
    {path: 'user-profile', component: UserProfileComponent,canActivate:[DeveloperGuard]},
    {path: 'user-enrolled-courses', component: UserCoursesComponent,canActivate:[DeveloperGuard]},
    {path: 'user-purchase-history', component: UserPurchaseHistoryComponent},
    {path: 'user-settings', component: UserSettingsComponent,canActivate:[DeveloperGuard]},
    {path: 'user-reviews', component: UserReviewsComponent,canActivate:[DeveloperGuard]},

    // Instructor dashboard
    {path: 'instructor-dashboard', component: InstructorDashboardComponent},
    {path: 'instructor-dashboard-profile', component: InstructorProfileComponent},
    {path: 'instructor-courses', component: InstructorCoursesComponent},
    {path: 'add-courses', component: InstructorAddCoursesComponent},
    {path : 'add-team', component : InstructorCoursesComponent},
    {path: 'instructor-purchase-history', component: InstructorPurchaseHistoryComponent},
    {path: 'instructor-earnings', component: InstructorEarningsComponent},
    {path: 'instructor-withdraw', component: InstructorWithdrawComponent},
    {path: 'instructor-employees', component: InstructorStudentsComponent},
    {path: 'instructor-settings', component: InstructorSettingsComponent},
    
    {path: 'notfound', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { InfanciaParquinhoComponent } from './epics/infancia/pages/infancia-parquinho/infancia-parquinho.component';
// import { InfanciaGamesComponent } from './../../.history/src/app/epics/infancia/infancia-parquinho/jogos-digitais/infancia-games/infancia-games.component_20210123190848';
// import { InfanciaGamesComponent } from './epics/infancia/infancia-parquinho/jogos-digitais/infancia-games/infancia-games.component';
import { PadletComponent } from './epics/infancia/embed-utils/padlet/padlet.component';
import { InfanciaCircoConcafrinhasComponent } from './epics/infancia/pages/infancia-circo-concafrinhas/infancia-circo-concafrinhas.component';
import { InfanciaRodaAlegriaComponent } from './epics/infancia/pages/infancia-roda-alegria/infancia-roda-alegria.component';
import { InfanciaCasaNvl2Component } from './epics/infancia/pages/infancia-casa-nvl2/infancia-casa-nvl2.component';
import { InfanciaCantinhoHistoriaComponent } from './epics/infancia/pages/infancia-cantinho-historia/infancia-cantinho-historia.component';
import { InfanciaCasaOracaoComponent } from './epics/infancia/pages/infancia-casa-oracao/infancia-casa-oracao.component';
import { InfanciaInicioComponent } from './epics/infancia/infancia-inicio/infancia-inicio.component';
import { NdcActivitiesComponent } from './epics/main/feira/ndc-activities/ndc-activities.component';
import { ShareMessageComponent } from './epics/main/share-message/share-message.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './epics/main/home/home.component';
import { ContentComponent } from './admin/content/content.component';
import { UsersComponent } from './social-network/users/users.component';
import { TimelineComponent } from './social-network/timeline/timeline.component';
import { ProfileComponent } from './social-network/profile/profile.component';
import { FollowingComponent } from './social-network/following/following.component';
import { FollowedComponent } from './social-network/followed/followed.component';

import { UserGuard } from './services/user.guard';
import { HubComponent } from './epics/main/hub/hub.component';
import { AudithoriumComponent } from './epics/main/audithorium/audithorium.component';
import { SelectJourneyComponent } from './components/select-journey/select-journey.component';
import { EventComponent } from './epics/main/event/event.component';
import { ConferenceEditComponent } from './admin/conference/conference-edit/conference-edit.component';
import { ConferenceListComponent } from './admin/conference/conference-list/conference-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EpicEditComponent } from './admin/epic/epic-edit/epic-edit.component';
import { EpicListComponent } from './admin/epic/epic-list/epic-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { SocialDashboardComponent } from './social-network/social-dashboard/social-dashboard.component';
import { SocialHomeComponent } from './social-network/social-home/social-home.component';
import { ConferenceAddComponent } from './admin/conference/conference-add/conference-add.component';
import { EpicAddComponent } from './admin/epic/epic-add/epic-add.component';
import { LectureAddComponent } from './admin/lecture/lecture-add/lecture-add.component';
import { LectureEditComponent } from './admin/lecture/lecture-edit/lecture-edit.component';
import { LectureListComponent } from './admin/lecture/lecture-list/lecture-list.component';
import { TrailAddComponent } from './admin/trail/trail-add/trail-add.component';
import { TrailEditComponent } from './admin/trail/trail-edit/trail-edit.component';
import { TrailListComponent } from './admin/trail/trail-list/trail-list.component';
import { ClassroomAddComponent } from './admin/classroom/classroom-add/classroom-add.component';
import { ClassroomEditComponent } from './admin/classroom/classroom-edit/classroom-edit.component';
import { ClassroomListComponent } from './admin/classroom/classroom-list/classroom-list.component';
import { DocumentEditComponent } from './admin/document/document-edit/document-edit.component';
import { DocumentListComponent } from './admin/document/document-list/document-list.component';
import { InfanciaDashboardComponent } from './epics/infancia/infancia-dashboard/infancia-dashboard.component';
import { InfanciaHomeComponent } from './epics/infancia/infancia-home/infancia-home.component';
import { StageEditComponent } from './admin/stage/stage-edit/stage-edit.component';
import { StageListComponent } from './admin/stage/stage-list/stage-list.component';
import { StageAddComponent } from './admin/stage/stage-add/stage-add.component';
import { ActivityAddComponent } from './admin/activity/activity-add/activity-add.component';
import { ActivityEditComponent } from './admin/activity/activity-edit/activity-edit.component';
import { ActivityListComponent } from './admin/activity/activity-list/activity-list.component';
// import { InfanciaLevelComponent } from './epics/infancia/infancia-level/infancia-level.component';
import { InfanciaAudithoriumComponent } from './epics/infancia/infancia-audithorium/infancia-audithorium.component';
import { InfanciaGeralComponent } from './epics/infancia/infancia-geral/infancia-geral.component';
import { SelectConferenceComponent } from './components/select-conference/select-conference.component';
import { ChartComponent } from './components/chart/chart.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TermosComponent } from './components/login/termos/termos.component';
import { AboutComponent } from './components/login/about/about.component';
import { JovemDashboardComponent } from './epics/jovem/jovem-dashboard/jovem-dashboard.component';
import { JovemHomeComponent } from './epics/jovem/jovem-home/jovem-home.component';
import { Ilha1Component } from './epics/jovem/pages/ilha1/ilha1.component';
import { Ilha2Component } from './epics/jovem/pages/ilha2/ilha2.component';
import { Ilha3Component } from './epics/jovem/pages/ilha3/ilha3.component';
import { Ilha4Component } from './epics/jovem/pages/ilha4/ilha4.component';
import { Ilha5Component } from './epics/jovem/pages/ilha5/ilha5.component';
import { Ilha1DialogoComponent } from './epics/jovem/pages/ilha1/ilha1-dialogo/ilha1-dialogo.component';
import { ChatComponent } from './components/chat/chat.component';
import { Ilha2DialogoComponent } from './epics/jovem/pages/ilha2/ilha2-dialogo/ilha2-dialogo.component';
import { Ilha3DialogoComponent } from './epics/jovem/pages/ilha3/ilha3-dialogo/ilha3-dialogo.component';
import { Ilha4DialogoComponent } from './epics/jovem/pages/ilha4/ilha4-dialogo/ilha4-dialogo.component';
import { Ilha5DialogoComponent } from './epics/jovem/pages/ilha5/ilha5-dialogo/ilha5-dialogo.component';
import { JogosTematicosComponent } from './epics/jovem/pages/ilha1/jogos-tematicos/jogos-tematicos.component';
import { MuralArtisticoComponent } from './epics/jovem/pages/ilha2/mural-artistico/mural-artistico.component';
import { AlegriaCristaMusicasComponent } from './epics/jovem/pages/ilha2/alegria-crista-musicas/alegria-crista-musicas.component';
import { LancamentosComponent } from './epics/jovem/pages/ilha5/lancamentos/lancamentos.component';
import { JovemAudithoriumComponent } from './epics/jovem/jovem-audithorium/jovem-audithorium.component';
import { TendaComponent } from './epics/main/tenda/tenda.component';
import { EventCleanComponent } from './epics/main/event-clean/event-clean.component';
import { EditoraComponent } from './epics/main/feira/editora/editora.component';
import { ClubeDoLivroComponent } from './epics/main/feira/clube-do-livro/clube-do-livro.component';
import { PalestrasComponent } from './epics/main/feira/palestras/palestras.component';
import { LivrosComponent } from './epics/main/feira/livros/livros.component';
import { VoluntariosComponent } from './epics/main/feira/voluntarios/voluntarios.component';
import { CecxComponent } from './epics/main/feira/cecx/cecx.component';
import { CfasComponent } from './epics/main/feira/cfas/cfas.component';
import { CaravanSpaceComponent } from './epics/main/caravan-space/caravan-space.component';
import { GamesComponent } from './epics/jovem/pages/ilha1/jogos-tematicos/games/games.component';
import { JovemListComponent } from './epics/jovem/jovem-list/jovem-list.component';
import { InfanciaBomSamaritanoComponent } from './epics/infancia/pages/infancia-bom-samaritano/infancia-bom-samaritano.component';
import { BrincadeirasComponent } from './epics/infancia/pages/infancia-parquinho/brincadeiras/brincadeiras.component';
import { InfanciaAtividadesComponent } from './epics/infancia/pages/infancia-atividades/infancia-atividades.component';
import { LaborterapiasComponent } from './epics/infancia/pages/infancia-atividades/laborterapias/laborterapias.component';
import { DesenhosImprimirComponent } from './epics/infancia/pages/infancia-atividades/desenhos-imprimir/desenhos-imprimir.component';
import { InfanciaCasaNvl1Component } from './epics/infancia/pages/infancia-casa-nvl1/infancia-casa-nvl1.component';
import { BercarioComponent } from './epics/infancia/pages/infancia-casa-nvl1/bercario/bercario.component';
import { MaternalComponent } from './epics/infancia/pages/infancia-casa-nvl1/maternal/maternal.component';
import { JardimComponent } from './epics/infancia/pages/infancia-casa-nvl1/jardim/jardim.component';
import { JogosDigitaisComponent } from './epics/infancia/pages/infancia-parquinho/jogos-digitais/jogos-digitais.component';
import { FlipsnackComponent } from './epics/infancia/embed-utils/flipsnack/flipsnack.component';

import { MissionAddComponent } from './admin/mission/mission-add/mission-add.component';
import { MissionEditComponent } from './admin/mission/mission-edit/mission-edit.component';
import { MissionListComponent } from './admin/mission/mission-list/mission-list.component';
import { JovemClassroomComponent } from './epics/jovem/jovem-classroom/jovem-classroom.component';
import { NdcComponent } from './epics/main/feira/ndc/ndc.component';
import { AudithoriumSpecialComponent } from './epics/main/audithorium-special/audithorium-special.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'termos', component: TermosComponent },
    { path: 'about', component: AboutComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'select-journey', component: SelectJourneyComponent, canActivate: [UserGuard] },
    { path: 'select-conference', component: SelectConferenceComponent, canActivate: [UserGuard] },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [UserGuard],
        children: [
            {path: '', component: ChartComponent},
            {path: 'conference/add', component: ConferenceAddComponent},
            {path: 'conference/edit/:id', component: ConferenceEditComponent},
            {path: 'conference/list', component: ConferenceListComponent},
            {path: 'conference/list/:page', component: ConferenceListComponent},
            {path: 'epic/add', component: EpicAddComponent},
            {path: 'epic/edit/:id', component: EpicEditComponent},
            {path: 'epic/list', component: EpicListComponent},
            {path: 'epic/list/:page', component: EpicListComponent},
            {path: 'lecture/add', component: LectureAddComponent},
            {path: 'lecture/edit/:id', component: LectureEditComponent},
            {path: 'lecture/list', component: LectureListComponent},
            {path: 'lecture/list/:page', component: LectureListComponent},
            {path: 'trail/add', component: TrailAddComponent},
            {path: 'trail/edit/:id', component: TrailEditComponent},
            {path: 'trail/list', component: TrailListComponent},
            {path: 'trail/list/:page', component: TrailListComponent},
            {path: 'classroom/add', component: ClassroomAddComponent},
            {path: 'classroom/edit/:id', component: ClassroomEditComponent},
            {path: 'classroom/list', component: ClassroomListComponent},
            {path: 'classroom/list/:page', component: ClassroomListComponent},
            {path: 'document/edit/:id', component: DocumentEditComponent},
            {path: 'document/list', component: DocumentListComponent},
            {path: 'document/list/:page', component: DocumentListComponent},
            {path: 'stage/add', component: StageAddComponent},
            {path: 'stage/edit/:id', component: StageEditComponent},
            {path: 'stage/list', component: StageListComponent},
            {path: 'stage/list/:page', component: StageListComponent},
            {path: 'activity/add', component: ActivityAddComponent},
            {path: 'activity/edit/:id', component: ActivityEditComponent},
            {path: 'activity/list', component: ActivityListComponent},
            {path: 'activity/list/:page', component: ActivityListComponent},
            {path: 'mission/add', component: MissionAddComponent},
            {path: 'mission/edit/:id', component: MissionEditComponent},
            {path: 'mission/list', component: MissionListComponent},
            {path: 'mission/list/:page', component: MissionListComponent},
            {path: 'user/edit/:id', component: UserEditComponent},
            {path: 'user/list', component: UserListComponent},
            {path: 'content', component: ContentComponent},
        ],
    },
    {
        path: 'social',
        component: SocialDashboardComponent,
        canActivate: [UserGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: SocialHomeComponent, canActivate: [UserGuard] },
            { path: 'pessoas', component: UsersComponent, canActivate: [UserGuard] },
            { path: 'pessoas/:page', component: UsersComponent, canActivate: [UserGuard] },
            { path: 'timeline', component: TimelineComponent, canActivate: [UserGuard] },
            { path: 'perfil/:id', component: ProfileComponent, canActivate: [UserGuard] },
            { path: 'seguindo/:id/:page', component: FollowingComponent, canActivate: [UserGuard] },
            { path: 'seguidores/:id/:page', component: FollowedComponent, canActivate: [UserGuard] },
        ],
    },
    {
        path: 'jovem',
        component: JovemDashboardComponent,
        canActivate: [UserGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: JovemHomeComponent, canActivate: [UserGuard] },
            {
                path: 'ilha-escritor',
                component: Ilha1Component,
                canActivate: [UserGuard],
                children: [
                    { path: '', redirectTo: 'dialogo/inicial', pathMatch: 'full' },
                    { path: 'dialogo/:dialog', component: Ilha1DialogoComponent, canActivate: [UserGuard] }
                ],
            },
            {
                path: 'jogos-tematicos',
                component: JogosTematicosComponent,
                canActivate:[UserGuard],
                children:[
                {path:'', redirectTo: 'games/inicial', pathMatch: 'full'},
                {path:'games/:jogo', component: GamesComponent, canActivate:[UserGuard]}

                ],
            },

            {
                path: 'ilha-som',
                component: Ilha2Component,
                canActivate: [UserGuard],
                children: [
                    { path: '', redirectTo: 'dialogo/inicial', pathMatch: 'full' },
                    { path: 'dialogo/:dialog', component: Ilha2DialogoComponent, canActivate: [UserGuard] }
                ],
            },
            { path: 'mural-artistico', component: MuralArtisticoComponent, canActivate: [UserGuard] },
            { path: 'alegria-crista-musicas', component: AlegriaCristaMusicasComponent, canActivate: [UserGuard] },
            {
                path: 'ilha-caminho',
                component: Ilha3Component,
                canActivate: [UserGuard],
                children: [
                    { path: '', redirectTo: 'dialogo/inicial', pathMatch: 'full' },
                    { path: 'dialogo/:dialog', component: Ilha3DialogoComponent, canActivate: [UserGuard] }
                ],
            },
            {
                path: 'ilha-irmas',
                component: Ilha4Component,
                canActivate: [UserGuard],
                children: [
                    { path: '', redirectTo: 'dialogo/inicial', pathMatch: 'full' },
                    { path: 'dialogo/:dialog', component: Ilha4DialogoComponent, canActivate: [UserGuard] }
                ],
            },
            {
                path: 'ilha-vivo',
                component: Ilha5Component,
                canActivate: [UserGuard],
                children: [
                    { path: '', redirectTo: 'dialogo/inicial', pathMatch: 'full' },
                    { path: 'dialogo/:dialog', component: Ilha5DialogoComponent, canActivate: [UserGuard] }
                ],
            },
            {path: 'lancamentos', component: LancamentosComponent, canActivate:[UserGuard]},
            {path: 'jovem-list/:id', component: JovemListComponent, canActivate:[UserGuard]},
            {path: 'audithorium/:type/:id', component: JovemAudithoriumComponent, canActivate:[UserGuard]},
            {path: 'jovem-classroom/:type/:id', component: JovemClassroomComponent, canActivate:[UserGuard]},
            {path: 'meus-dados', component: ProfileEditComponent, canActivate:[UserGuard]},
            {path: 'caravan-space', component: CaravanSpaceComponent, canActivate:[UserGuard]},
        ],
    },

    {
        path: 'concafrinhas',
        component: InfanciaDashboardComponent,
        canActivate: [UserGuard],
        children: [

            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'inicio', component: InfanciaInicioComponent, canActivate: [UserGuard] },
            { path: 'home', component: InfanciaHomeComponent, canActivate: [UserGuard] },
            { path: 'casa-oracao', component: InfanciaCasaOracaoComponent, canActivate: [UserGuard] },

            { path: 'parquinho', component: InfanciaParquinhoComponent, canActivate: [UserGuard] },
            { path: 'parquinho/brincadeiras', component: BrincadeirasComponent, canActivate: [UserGuard] },
            { path: 'parquinho/jogos-digitais', component: JogosDigitaisComponent, canActivate: [UserGuard] },

            
            { path: 'atividades', component: InfanciaAtividadesComponent, canActivate: [UserGuard], },
            { path: 'atividades/laborterapias', component: LaborterapiasComponent, canActivate: [UserGuard] },
            { path: 'atividades/desenhos-imprimir', component: DesenhosImprimirComponent, canActivate: [UserGuard] },

            { path: 'casa-nvl-1', component: InfanciaCasaNvl1Component, canActivate: [UserGuard] },
            { path: 'casa-nvl-1/bercario', component: BercarioComponent, canActivate: [UserGuard] },
            { path: 'casa-nvl-1/maternal', component: MaternalComponent, canActivate: [UserGuard] },
            { path: 'casa-nvl-1/jardim', component: JardimComponent, canActivate: [UserGuard] },

            { path: 'cantinho-historia', component: InfanciaCantinhoHistoriaComponent, canActivate: [UserGuard] },
            { path: 'casa-nvl-2', component: InfanciaCasaNvl2Component, canActivate: [UserGuard] },
            { path: 'roda-alegria', component: InfanciaRodaAlegriaComponent, canActivate: [UserGuard] },
            { path: 'bom-samaritano', component: InfanciaBomSamaritanoComponent, canActivate: [UserGuard] },
            { path: 'circo-concafrinhas', component: InfanciaCircoConcafrinhasComponent, canActivate: [UserGuard] },
            { path: 'nosso-mural', component: PadletComponent, canActivate: [UserGuard] },
            { path: 'flipsnack/:hash', component: FlipsnackComponent, canActivate: [UserGuard] },


            // {path: 'nivel', component: InfanciaLevelComponent, canActivate:[UserGuard]},
            // {path: 'nivel/:level', component: InfanciaLevelComponent, canActivate:[UserGuard]},
            { path: 'geral', component: InfanciaGeralComponent, canActivate: [UserGuard] },
            { path: 'audithorium/:type/:id', component: InfanciaAudithoriumComponent, canActivate: [UserGuard] },
        ],
    },
    {
        path: '',
        component: EventComponent,
        children: [
            {path: '',  redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent, canActivate:[UserGuard]},
            {path: 'audithorium/:type/:id', component: AudithoriumComponent, canActivate:[UserGuard]},
            {path: 'schedule', component: ScheduleComponent, canActivate:[UserGuard]},
            {path: 'cfas', component: CfasComponent, canActivate:[UserGuard]},
            {path: 'cecx', component: CecxComponent, canActivate:[UserGuard]},
            {path: 'voluntarios', component: VoluntariosComponent, canActivate:[UserGuard]},
            {path: 'livros', component: LivrosComponent, canActivate:[UserGuard]},
            {path: 'clube-do-livro', component: ClubeDoLivroComponent, canActivate:[UserGuard]},
            {path: 'palestras', component: PalestrasComponent, canActivate:[UserGuard]},
            {path: 'editora', component: EditoraComponent, canActivate:[UserGuard]},
            {path: 'caravan-space', component: CaravanSpaceComponent, canActivate:[UserGuard]},
            {path: 'ndc', component: NdcComponent, canActivate:[UserGuard]},
            {path: 'ndc-activities', component: NdcActivitiesComponent, canActivate:[UserGuard]},
            {path: 'audithorium-special/:type', component: AudithoriumSpecialComponent, canActivate:[UserGuard]},
            {path: 'audithorium-special/:type/:contentId', component: AudithoriumSpecialComponent, canActivate:[UserGuard]},
        ],
    },
    {
        path: '',
        component: EventCleanComponent,
        children: [
            { path: 'meus-dados', component: ProfileEditComponent, canActivate: [UserGuard] },
        ],
    },
    {
        path: '',
        component: TendaComponent,
        children: [
            { path: 'hub', component: HubComponent, canActivate: [UserGuard] },
        ],
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);

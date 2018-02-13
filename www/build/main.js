webpackJsonp([0],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpectatorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SpectatorPage = (function () {
    function SpectatorPage(platform, actionsheetCtrl, navCtrl, database) {
        var _this = this;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.navCtrl = navCtrl;
        this.database = database;
        this.key = {};
        this.score = {};
        this.roster = "Scoring";
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
        this.roster = "vs.";
        this.score.ballPtr = 0;
        this.score.totalRuns = 0;
        this.score.totalOvers = "";
        this.score.totalWickets = 0;
        this.key.MatchKey = "0";
        this.name = this.database.object('/ClubParams/LiveMatchState/');
        this.playersTeamA$ = this.database.list('Matches/Match1/MatchStats/PlayerRoster/Home');
        this.playersTeamB$ = this.database.list('Matches/Match1/MatchStats/PlayerRoster/Away');
        this.name.take(1).subscribe(function (data) {
            console.log("Match Ptr: " + data.matchPtr);
            _this.key.MatchKey = data.matchPtr;
            _this.setMatchStats(_this.key.MatchKey);
        }); // Finds out the corrent matchPtr
        // this.playersTeamA$.subscribe(x => console.log(x))
        // this.scoreRef$.last().subscribe(keys => console.log("keys are", keys));
        // this.database.list('Matches/Match1/Balls').subscribe(list => this.scoreRef$ = list);
    }
    SpectatorPage.prototype.setMatchStats = function (key) {
        console.log(key);
        this.scoreRef$ = this.database.list("/Matches/" + key + "/MatchStats/Score/");
        this.matchStats$ = this.database.list("/Matches/" + key + "/MatchStats/");
    };
    return SpectatorPage;
}());
SpectatorPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/spectator/spectator.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div text-center *ngFor ="let item of matchStats$ | async; let i = index; let lst = last">\n    		<ion-title *ngIf="i == 1">{{item.totalRuns}} / {{item.totalWickets}} ({{item.totalOvers}})</ion-title>\n    </div>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n      <ion-segment [(ngModel)]="roster">\n        <ion-segment-button value="Home">\n          Home\n        </ion-segment-button>\n        <ion-segment-button value="vs.">\n          vs.\n        </ion-segment-button>\n        <ion-segment-button value="Away">\n          Away\n        </ion-segment-button>\n      </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n  <div [ngSwitch]="roster">\n    <div *ngSwitchCase="\'Home\'">\n        <ion-item *ngFor="let items of playersTeamA$ | async;">\n        <h2>{{items.$key}} Number: {{items.$value}}</h2>\n      </ion-item>\n    </div>\n\n    <ion-list *ngSwitchCase="\'vs.\'">\n      <div *ngFor ="let item of matchStats$ | async; let i = index; let lst = last">\n      <ion-grid>\n      <ion-row>\n    		<ion-col>\n			<h2 text-center *ngIf="i == 1">| Runs |</h2>\n		</ion-col>\n		<ion-col>\n    		    <h2 text-center *ngIf="i == 1">| Wickets |</h2>\n		</ion-col>\n		<ion-col>\n    		    <h2 text-center *ngIf="i == 1">| Overs |</h2>\n		</ion-col>\n	  </ion-row>\n      <ion-row>\n    		<ion-col>\n			<h2  text-center *ngIf="i == 1">{{item.totalRuns}}</h2>\n		</ion-col>\n		<ion-col>\n    		    <h2 text-center *ngIf="i == 1">{{item.totalWickets}}</h2>\n		</ion-col>\n		<ion-col>\n    		    <h2 text-center *ngIf="i == 1">{{item.totalOvers}}</h2>\n		</ion-col>\n	  </ion-row>\n    </ion-grid>\n      </div>\n    <div *ngFor ="let item of scoreRef$ | async; let i = index; let lst = last">\n          <h2 *ngIf="i==lst">Next Ball: {{ item.$value }}</h2>\n    </div>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'Away\'">\n      <ion-item *ngFor="let items of playersTeamB$ | async;">\n        <h2>{{items.$key}} Number: {{items.$value}}</h2>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n\n\n\n<!--ion-content padding class="action-sheets-basic-page">\n\n  <button ion-button block (click)="openMenu()">\n    Show Action Sheet\n  </button>\n</ion-content !-->\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/spectator/spectator.html"*/,
        selector: 'spectator.scss'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], SpectatorPage);

//# sourceMappingURL=spectator.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__umpire_umpire__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreatePage = (function () {
    function CreatePage(navCtrl, data) {
        this.navCtrl = navCtrl;
        this.data = data;
        this.key = {};
        this.balls = {};
        this.team = {};
        this.score = {};
        this.captains = {};
    }
    CreatePage.prototype.create = function (key, captains) {
        var _this = this;
        this.name = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: captains.Awaycaptain
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                alert("The Away Team's Captain's Jersey Number is not in our databasee");
            }
            else {
                console.log('User does exist');
                //console.log(data);
                _this.captains.Awaycaptain = captains.Awaycaptain;
            }
        });
        this.name = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: captains.Awaycaptain
            }
        });
        this.Home = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: captains.Homecaptain
            }
        });
        this.Home.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                alert("The Home Team's Captain's Jersey Number is not in our database");
            }
            else {
                console.log('User does exist');
                //console.log(data);
                _this.captains.Homecaptain = captains.Homecaptain;
            }
        });
        this.balls.ballid = 0;
        //this.balls.ifWide = "false";
        this.balls.ifExtras = "false";
        //this.balls.isWicket = "false" ;
        this.balls.octant = 0;
        key.ballKey = this.balls.ballid;
        this.captains.Homevcaptain = 0;
        this.captains.Awayvcaptain = 0;
        this.captains.Homewk = 0;
        this.captains.Awaywk = 0;
        this.team.toss = "Team";
        this.team.TeamName = " ";
        //this.captains.umpire = 0;
        //this.score.ballsnOver=0;
        //this.score.totalOvers= "";
        this.score.totalRuns = 0;
        this.score.totalWickets = 0;
        this.score.ballPtr = 1;
        for (var i = 1; i <= key.numPlayers; i++) {
            this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Away/check/p" + i + "/")
                .set(-1);
        }
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Away/check/amountofPlayers")
            .set(key.numPlayers);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Away/MainRoles/Awaycaptain")
            .set(this.captains.Awaycaptain);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Away/MainRoles/Awayvcaptain")
            .set(this.captains.Awayvcaptain);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Away/MainRoles/Awaywk")
            .set(this.captains.Awaywk);
        for (var i = 1; i <= key.numPlayers; i++) {
            this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Home/check/p" + i + "/")
                .set(-1);
        }
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Home/check/amountofPlayers")
            .set(key.numPlayers);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Home/MainRoles/HomeCaptain/")
            .set(this.captains.Homecaptain);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Home/MainRoles/Homevcaptain/")
            .set(this.captains.Homevcaptain);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/PlayerRoster/Home/MainRoles/Homewk/")
            .set(this.captains.Homewk);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/Score/")
            .set(this.score);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/Toss/")
            .set(this.team.toss);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/TeamName/")
            .set(this.team.TeamName);
        this.data.object("Matches/" + key.MatchKey + "/MatchStats/Umpire/")
            .set(this.captains.umpire);
        this.data.object("ClubParams/LiveMatchState/matchPtr")
            .set(key.MatchKey);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__umpire_umpire__["a" /* UmpirePage */]);
    };
    return CreatePage;
}());
CreatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-create',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/createMatch/createMatch.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Create</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-fab right bottom>\n        <button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n    <ion-list>\n        <ion-list-header text-center class="headfont"> Create Match </ion-list-header>\n        <ion-item>\n            <ion-label floating>Match Key</ion-label>\n            <ion-input type="text"[(ngModel)] = "key.MatchKey"></ion-input>\n        </ion-item>\n\n        <ion-item>\n                <ion-label floating>Overs</ion-label>\n                <ion-input type="text"[(ngModel)] = "score.numOfOvers"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Umpire</ion-label>\n            <ion-input type="text"[(ngModel)] = "captains.umpire"></ion-input>\n        </ion-item>\n\n\n        <ion-item>\n            <ion-label floating>Home Team Captain Jersey Number</ion-label>\n            <ion-input type="text"[(ngModel)] = "captains.Homecaptain"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Away Team Captain JerseyNumber</ion-label>\n            <ion-input type="text"[(ngModel)] = "captains.Awaycaptain"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>How many players</ion-label>\n            <ion-input type="text"[(ngModel)] = "key.numPlayers"></ion-input>\n        </ion-item>\n\n\n    </ion-list>\n\n    <div padding>\n        <button ion-button  type="button" (click)="create(key,captains)">Start Match</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/createMatch/createMatch.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], CreatePage);

//# sourceMappingURL=createMatch.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddPage = (function () {
    function AddPage(navCtrl, navPrams, data) {
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.player = {};
        var user = null;
        user = this.navPrams.get('playerInfo');
        //console.log(user.email);
        this.player.email = user.email;
        this.player.picture = user.photoURL;
        this.player.name = user.displayName;
        alert("hey " + user.email);
        //this.player.picture = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Iverson_from_behind.jpg/180px-Iverson_from_behind.jpg";
        //this.player.email= "nbadavis@gmail.com";
        //this.userRef$ = this.data.object('Players');
    }
    AddPage.prototype.addPlayer = function (player) {
        var _this = this;
        var pass = document.getElementById('pass');
        var r_pass = document.getElementById('r_pass');
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var jn = document.getElementById('jn');
        this.player.strikeRate = 0;
        this.player.highscore = 0;
        this.player.wickets = 0;
        this.player.fours = 0;
        this.player.sixes = 0;
        this.player.runs = 0;
        this.player.accesslevel = 2;
        //this.player.picture = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Iverson_from_behind.jpg/180px-Iverson_from_behind.jpg";
        //this.player.email= "nbadavis@gmail.com";
        this.name = this.data.list("/ClubParams/ClubRoster/", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: player.Jersey_Number
            }
        });
        this.name.take(1).subscribe(function (data) {
            console.log(data.length);
            if (data.length == 1) {
                alert("Jersey Number is already taken enter a diffrent one");
            }
            if (data.length == 0) {
                _this.data.object("ClubParams/ClubRoster/" + player.Jersey_Number)
                    .set(player);
                _this.player = {};
            }
        });
    };
    return AddPage;
}());
AddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/add/add.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" ></ion-icon>\n    </button>\n    <ion-title class="bar">Add</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n<ion-fab right bottom>\n<button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n</ion-fab>\n<ion-list>\n	<ion-list-header text-center class="headfont"> Add Player </ion-list-header>\n    <ion-item>\n        <ion-label floating>First Name</ion-label>\n        <ion-input id ="Fname" type="text"[(ngModel)] = "player.FirstName"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label floating>Last Name</ion-label>\n        <ion-input id ="Lname" type="text"[(ngModel)] = "player.LastName"></ion-input>\n    </ion-item>\n\n    <ion-item>\n    <ion-label floating>Jersey Number</ion-label>\n		<ion-input id ="jr" type="text"[(ngModel)] = "player.Jersey_Number"></ion-input>\n	</ion-item>\n\n\n\n\n</ion-list>\n\n<div padding>\n\n  <button ion-button  type="button" (click)="addPlayer(player)">Add Player</button>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/add/add.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], AddPage);

//# sourceMappingURL=add.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__show_show__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchPage = (function () {
    function SearchPage(navCtrl, data) {
        this.navCtrl = navCtrl;
        this.data = data;
        this.player = {};
        this.fireauth = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]();
        this.userProfile = null;
        this.prof = null;
    }
    SearchPage.prototype.check = function (player) {
        var _this = this;
        this.name = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: player.Jersey_Number
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                alert("Player with this Jersey Number is not in our databasee");
            }
            else {
                console.log('User does exist');
                //console.log(data);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__show_show__["a" /* ShowPage */], { playerInfo: data });
            }
        });
    };
    SearchPage.prototype.new = function () {
        var _this = this;
        this.fireauth.onAuthStateChanged(function (user) {
            if (user) {
                _this.userProfile = user;
                alert("new: " + user.email);
            }
            else {
                _this.userProfile = null;
            }
        });
        this.other = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "email",
                equalTo: this.userProfile.email
            }
        });
        this.other.subscribe(function (data) {
            _this.prof = data;
        });
        alert("prof: " + JSON.stringify(this.prof));
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-search',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/Search/search.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Player Search</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-fab right bottom>\n        <button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n    <ion-list>\n        <ion-list-header text-center class="headfont"> Search </ion-list-header>\n        <ion-item>\n            <ion-label floating>Jersey Number</ion-label>\n            <ion-input id ="jr" type="text"[(ngModel)] = "player.Jersey_Number"></ion-input>\n        </ion-item>\n\n\n    </ion-list>\n\n    <div padding>\n        <button ion-button  type="button" (click)="check(player)">Check</button>\n        <button ion-button  type="button" (click)="new()">Profile</button>\n    </div>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/Search/search.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowPage = (function () {
    function ShowPage(navCtrl, navPrams, data) {
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.player = {};
        this.name = this.navPrams.get('playerInfo');
        this.playerRef$ = this.data.list('Players');
    }
    return ShowPage;
}());
ShowPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-show',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/show/show.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Player Profile</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<body class="player">\n\n\n    <div class="row">\n        <div class="col-md-3">\n            <div style="width: 300px; margin:auto">\n                <div class="card toty fifa17">\n                    <div class="player">\n                        <img src="assets/img/Player_Profile.jpg" id="player-card">\n\n                        <div class="avatarholder" style="width: 115px; resize: horizontal ">\n                            <img src= {{this.name[0].picture}} class="avatar">\n                        </div>\n                        <div class=" name">\n                            <span class="marquee">{{this.name[0].FirstName}}</span>\n                        </div>\n                        <div class="attributes ">\n                            <span class="loyalty">\n                            </span>\n                            <span class="runs">{{this.name[0].runs}}</span>\n                            <span class="wickets">{{this.name[0].wickets}}</span>\n                            <span class="highestScore">{{this.name[0].highscore}}</span>\n                            <span class="average">{{this.name[0].strikeRate}}</span>\n                            <span class="four">{{this.name[0].fours}}</span>\n                            <span class="six">{{this.name[0].sixes}}</span>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n        <div style="height: 20px"></div>\n</body>'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/show/show.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], ShowPage);

//# sourceMappingURL=show.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwayFindPlayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AwayTeamMembers_AwayteamMembers__ = __webpack_require__(307);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AwayFindPlayerPage = AwayFindPlayerPage_1 = (function () {
    function AwayFindPlayerPage(navCtrl, navPrams, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.player = {};
        this.SidePlayer = {};
        this.side = {};
        this.AwayChecker = null;
        this.data.object("ClubParams/LiveMatchState/matchPtr").subscribe(function (data) {
            console.log("ForNow: " + data.$value);
            _this.forNow = data.$value;
            //console.log("Find Player StartKey: " + this.forNow);
        });
        //console.log("Find Player Squad: " + this.forNow.squad);
        this.data.list("Matches/" + this.forNow + "/MatchStats/PlayerRoster/Away/Players/")
            .subscribe(function (data) {
            _this.AwayPlayers = data;
            _this.players = data.length;
            console.log("Player: " + data.length);
            console.log("Away Players: " + _this.AwayPlayers);
        });
        this.playerRef$ = this.data.list("ClubParams/ClubRoster");
        this.playerRef$.subscribe(function (data) {
            _this.roster$ = data;
            console.log("Roster: " + data.length);
            _this.roster = data.length;
            console.log("roster$: " + _this.roster$);
        });
        this.AwayChecker = this.AwayPlayers;
        var x;
        var y;
        var z;
        x = 0;
        y = 0;
        while (x < this.roster) {
            while (y < this.players) {
                console.log("X: " + x);
                console.log("y: " + y);
                console.log("this.roster$[x].Jersey_Number: " + this.roster$[x].Jersey_Number);
                console.log("this.AwayPlayers[y].$value: " + this.AwayPlayers[y].$value);
                if (this.roster$[x].Jersey_Number == this.AwayPlayers[y].$value) {
                    console.log("this.roster$[x]: " + this.roster$[x]);
                    console.log("this.AwayChecker[z]: " + this.AwayChecker[z]);
                    this.AwayChecker[y] = this.roster$[x];
                }
                y += 1;
            }
            x += 1;
            y = 0;
        }
        //console.log("Checker: " + this.Checker[0]);
    }
    AwayFindPlayerPage.prototype.check = function (player) {
        var _this = this;
        this.name = this.data.list("ClubParams/ClubRoster/", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: player.Jersey_Number
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                alert("Player with this Jersey Number is not in our databasee");
            }
            else {
                var Fornow;
                console.log('User does exist');
                console.log("REF DATA: " + data);
                _this.SidePlayer = data[0];
                _this.SidePlayer.startKey = _this.forNow;
                console.log("Startkey: " + _this.forNow);
                console.log("SidePlayer Name: " + _this.SidePlayer.FirstName);
                _this.SidePlayer.picture = " ";
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__AwayTeamMembers_AwayteamMembers__["a" /* AwayTeamMembersPage */], { playerInfo: _this.SidePlayer });
            }
        });
        //console.log("SidePlayer Jersey2: " + this.SidePlayer.Jersey_Number);
        //this.navCtrl.push(TeamMembersPage, {playerInfo:this.spot });
    };
    AwayFindPlayerPage.prototype.reload = function () {
        this.navCtrl.push(AwayFindPlayerPage_1);
    };
    return AwayFindPlayerPage;
}());
AwayFindPlayerPage = AwayFindPlayerPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Awayfind',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/AwayFindPlayer/AwayFindPlayer.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Player Search</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-fab right bottom>\n        <button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n    <ion-list>\n        <ion-list-header text-center class="headfont"> Search Away </ion-list-header>\n        <ion-item>\n            <ion-label floating>Jersey Number</ion-label>\n            <ion-input id ="jr" type="text"[(ngModel)] = "SidePlayer.Jersey_Number"></ion-input>\n        </ion-item>\n\n\n    </ion-list>\n\n    <div padding>\n        <button ion-button  type="button" (click)="check(SidePlayer)">Check</button>\n        <button ion-button  type="button" (click)="reload()">Reload</button>\n\n    </div>\n\n\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6 col-md-4 col-xl-3 *ngFor ="let item of AwayChecker" >\n                <div class="card toty fifa17">\n                    <div class="player">\n                        <img src="assets/img/Player_Profile.jpg" id="player-card">\n\n                        <div class="avatarholder" >\n                            <img src= {{item.picture}}>\n                        </div>\n                        <div class=" name">\n                            <span class="marquee">{{item.FirstName}}</span>\n                        </div>\n                        <div class="attributes ">\n            <span class="loyalty">\n            </span>\n                            <span class="runs">{{item.runs}}</span>\n                            <span class="wickets">{{item.wickets}}</span>\n                            <span class="highestScore">{{item.highscore}}</span>\n                            <span class="average">{{item.strikeRate}}</span>\n                            <span class="four">{{item.fours}}</span>\n                            <span class="six">{{item.sixes}}</span>\n\n                        </div>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/AwayFindPlayer/AwayFindPlayer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], AwayFindPlayerPage);

var AwayFindPlayerPage_1;
//# sourceMappingURL=AwayFindPlayer.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__getter_getter__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__add_add__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Search_search__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_app__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SignInPage = SignInPage_1 = (function () {
    function SignInPage(navCtrl, database, navParams, googleplus, platform, data, facebook) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.database = database;
        this.navParams = navParams;
        this.googleplus = googleplus;
        this.platform = platform;
        this.data = data;
        this.facebook = facebook;
        this.userProfile = null;
        this.fireauth = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]();
        this.userProf = null;
        this.fireauth.onAuthStateChanged(function (user) {
            if (user) {
                _this.userProfile = user;
                alert("new: " + user.email);
            }
            else {
                _this.userProfile = null;
            }
        });
        //alert(SignInPage.emailId)
        // alert(this.userProfile.email);
        this.accessNo$ = this.database.list('ClubParams/ClubRoster');
    }
    SignInPage.prototype.googleauth = function () {
        var _this = this;
        var clientInfo = {
            'webClientId': '881322195809-mrs1rnkn77qnovhm89h2uhqd2thrrbor.apps.googleusercontent.com',
            'offline': true
        };
        if (this.platform.is('android')) {
            clientInfo.webClientId = '881322195809-mrs1rnkn77qnovhm89h2uhqd2thrrbor.apps.googleusercontent.com';
            clientInfo.offline = true;
        }
        this.googleplus.login(clientInfo)
            .then(function (res) {
            var firecreds = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"].GoogleAuthProvider.credential(res.idToken);
            _this.fireauth.signInWithCredential(firecreds).then(function (res) {
                //alert("Firebase success: " + JSON.stringify(res));
                _this.check(_this.userProfile);
                //this.goToAdd(this.userProfile);
            }).catch(function (err) {
                alert('Firebase auth failed' + err);
            });
        }).catch(function (err) {
            alert('Error' + err);
        });
    };
    SignInPage.prototype.authorize = function () {
        this.bleh = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "email",
                equalTo: this.userProfile.email
            }
        });
        this.bleh.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                alert("Player with this email is not in our database");
            }
            else {
                console.log('User does exist');
                console.log(data);
                SignInPage_1.jersey_num = data[0].Jersey_Number;
            }
        });
        if (SignInPage_1.jersey_num) {
            this.data.object("ClubParams/AccessLevel/" + SignInPage_1.jersey_num).subscribe(function (data) {
                alert("AccessLevel: " + data.$value);
                if (data.$value) {
                    localStorage.setItem("hello", data.$value);
                    window.location.reload();
                }
            });
        }
        //this.data.object('/ClubParams/AccessLevel/' + SignInPage.jersey_num + "/").subscribe(data => console.log("Value: " + data))
    };
    SignInPage.prototype.login5 = function () {
        var _this = this;
        this.facebook.login(["email"]).then(function (loginResponse) {
            var cred = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"].FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);
            __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]().signInWithCredential(cred).then(function (info) {
                _this.userProf = info;
                //alert("lollllllll"+ JSON.stringify(info));
                _this.check(_this.userProfile);
            })
                .catch(function (error) {
                this.check(this.userProfile);
                alert('Firebase auth failed' + error);
            });
        });
    };
    SignInPage.prototype.check = function (userprofile) {
        var _this = this;
        this.name = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "email",
                equalTo: userprofile.email
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                alert('User does not exist' + data);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__add_add__["a" /* AddPage */], { playerInfo: userprofile });
            }
            else {
                alert('User does exist' + data);
                console.log(data);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        });
    };
    SignInPage.prototype.logout = function () {
        alert("Are you sure you want to remove this account forever?");
        this.userProfile = null;
        this.facebook.logout();
        this.fireauth.signOut();
        // this.googleauth();
        // this.navCtrl.push(MyApp);
    };
    SignInPage.prototype.goTohome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    SignInPage.prototype.goToGetter = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__getter_getter__["a" /* GetterPage */]);
    };
    SignInPage.prototype.goToAdd = function () {
        //this.userProf.picture = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Iverson_from_behind.jpg/180px-Iverson_from_behind.jpg";
        //this.userProf.email= "nbadavis@gmail.com";
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__add_add__["a" /* AddPage */]);
    };
    SignInPage.prototype.goToSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__Search_search__["a" /* SearchPage */]);
    };
    SignInPage.prototype.isloggedin = function () {
        alert("New: " + this.userProfile.email);
    };
    return SignInPage;
}());
SignInPage.jersey_num = 0;
SignInPage.emailId = "";
SignInPage = SignInPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signIn',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/signIn/signIn.html"*/'<ion-content padding>\n<ion-fab right bottom>\n<button  class="ball" ion-fab color="secondary" large (click)="goTohome()"><ion-icon color="live" name="tennisball"></ion-icon></button>\n</ion-fab>\n\n<div text-center>\n	<img src="assets/img/Welcome.jpg" />\n	<h1 color="secondary"> Davis Dragons®\n	</h1>\n	<h3 color="live"> The Official App for the Cricket Club at UC Davis.\n    </h3>\n\n\n    <button ion-button large  color="danger" round (click)="login5()" >\n       &nbsp; Login with Facebook\n    </button>\n\n  <ion-item *ngIf="userProfile">\n    <ion-avatar (click)="isloggedin()" item-left>\n      <img [src]="userProfile.photoURL">\n    </ion-avatar>\n    <h2 (click)="isloggedin()">{{ userProfile.displayName }}</h2>\n    <h3>There it is: {{ userProfile.email }}</h3>\n    <ion-icon name="remove" item-right (click)="logout()"></ion-icon>\n  </ion-item>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/signIn/signIn.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */]])
], SignInPage);

var SignInPage_1;
//# sourceMappingURL=signIn.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchOfflinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createMatch_createMatch__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MatchOfflinePage = (function () {
    function MatchOfflinePage(platform, actionsheetCtrl, navCtrl, database) {
        var _this = this;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.navCtrl = navCtrl;
        this.database = database;
        this.key = {};
        this.score = {};
        this.roster = "Scoring";
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
        this.score.totalRuns = 0;
        this.score.totalOvers = "";
        this.score.totalWickets = 0;
        this.key.MatchKey = "0";
        this.name = this.database.object('/ClubParams/LiveMatchState/');
        this.name.take(1).subscribe(function (data) {
            console.log("Match Ptr: " + data.matchPtr);
            _this.key.MatchKey = data.matchPtr;
            _this.setMatchStats(_this.key.MatchKey);
        }); // Finds out the corrent matchPtr
        // this.playersTeamA$.subscribe(x => console.log(x))
        // this.scoreRef$.last().subscribe(keys => console.log("keys are", keys));
        // this.database.list('Matches/Match1/Balls').subscribe(list => this.scoreRef$ = list);
    }
    MatchOfflinePage.prototype.setMatchStats = function (key) {
        console.log(key);
        this.matchStats$ = this.database.list("/Matches/" + key + "/MatchStats/");
    };
    MatchOfflinePage.prototype.sendToCreate = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__createMatch_createMatch__["a" /* CreatePage */]);
    };
    MatchOfflinePage.prototype.sendToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    return MatchOfflinePage;
}());
MatchOfflinePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/matchOffline/matchOffline.html"*/'<ion-header>\n        <ion-navbar>\n            <button ion-button menuToggle>\n                <ion-icon name="menu" ></ion-icon>\n            </button>\n        <ion-title class="bar">Match End</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <h1>Match Finished!</h1>\n    <div *ngFor ="let item of matchStats$ | async; let i = index;">\n            <h1 padding *ngIf="i == 1"> Final Score<br><br>\n            {{item.totalRuns}} / {{item.totalWickets}} </h1>\n            <h2 padding *ngIf="i == 1">{{item.totalOvers}} overs</h2>\n    </div><br>\n    <button class="buttons"(click)="sendToCreate()">Start a new Match</button><br><br>\n    <button class="buttons"(click)="sendToHome()">Return to Home Page</button>\n</ion-content>\n    '/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/matchOffline/matchOffline.html"*/,
        selector: 'matchOffline.scss'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], MatchOfflinePage);

//# sourceMappingURL=matchOffline.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExtrasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ExtrasPage = (function () {
    function ExtrasPage(navCtrl, actionsheetCtrl, fdb, platform) {
        this.navCtrl = navCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.fdb = fdb;
    }
    ExtrasPage.prototype.openMenu = function () {
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Extras',
            buttons: [
                {
                    text: 'Bye',
                    handler: function () {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Leg-Bye',
                    handler: function () {
                        console.log('Play clicked');
                    }
                },
                {
                    text: 'No-Ball',
                    handler: function () {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return ExtrasPage;
}());
ExtrasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/extras/extras.html"*/'\n\n<ion-content>\n  <div>\n<button ion-button color="secondary" clear menuToggle>\n  <ion-icon name="menu"></ion-icon>\n</button>\n</div>\n <div class = "actionSheet">\n  <button ion-button block color = "secondary" (click)="openMenu()">\n    Extras\n  </button>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/extras/extras.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
], ExtrasPage);

//# sourceMappingURL=extras.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_add__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GetterPage = (function () {
    function GetterPage(navCtrl, data) {
        this.navCtrl = navCtrl;
        this.data = data;
        this.player = {};
    }
    GetterPage.prototype.check = function (player) {
        var _this = this;
        this.name = this.data.list("/ClubParams/ClubRoster", {
            query: {
                orderByChild: "email",
                equalTo: player.email
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                console.log(data);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_add__["a" /* AddPage */], { playerInfo: player });
            }
            else {
                console.log('User does exist');
                console.log(data);
                alert("This email is taken");
                //this.navCtrl.push(HomePage);
            }
        });
    };
    return GetterPage;
}());
GetterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-getter',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/getter/getter.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Home</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-fab right bottom>\n        <button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n    <ion-list>\n        <ion-list-header text-center class="headfont"> Check </ion-list-header>\n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input id ="jr" type="text"[(ngModel)] = "player.email"></ion-input>\n        </ion-item>\n\n\n    </ion-list>\n\n    <div padding>\n        <button ion-button  type="button" (click)="check(player)">Check</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/getter/getter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], GetterPage);

//# sourceMappingURL=getter.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamMembersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FindPlayer_FindPlayer__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TeamMembersPage = (function () {
    function TeamMembersPage(navCtrl, navPrams, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.player = {};
        this.key = {};
        this.sideTeam = {};
        this.thePlayer = this.navPrams.get('playerInfo');
        console.log("ThePlayer key: " + this.thePlayer.startKey);
        this.data.object("Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Home/check/amountofPlayers/")
            .subscribe(function (data) {
            _this.NumofPlayers = data.$value;
        });
        this.playerInfo = this.data.list("/Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Home/", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: this.thePlayer.Jersey_Number
            }
        });
        this.playerInfo.take(1).subscribe(function (data) {
            if (data.length === 1) {
                alert("Player with this Jersey Number is already part of the team.");
            }
            if (data.length == 0) {
                var test = 0;
                _this.numPlayer = _this.data.list("Matches/" + _this.thePlayer.startKey + "/MatchStats/PlayerRoster/Home/check/");
                _this.numPlayer.subscribe(function (val) {
                    _this.open = val;
                });
            }
        });
    }
    TeamMembersPage.prototype.goToaddPlayer = function () {
        this.check(this.open);
    };
    TeamMembersPage.prototype.check = function (user) {
        var test = 1;
        var stop = 0;
        stop += this.NumofPlayers;
        this.sideTeam.startKey = this.thePlayer.startKey;
        while (test <= this.NumofPlayers) {
            //console.log("user value: "+ user[test].$key);
            if (user[test].$value == -1) {
                var save;
                save = user[test].$key;
                //console.log("Save: " + save);
                this.add(save);
                break;
            }
            test += 1;
            if (test == stop) {
                alert("You cannot enter more players");
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__FindPlayer_FindPlayer__["a" /* FindPlayerPage */], { team: this.sideTeam });
            }
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__FindPlayer_FindPlayer__["a" /* FindPlayerPage */], { team: this.sideTeam });
    };
    TeamMembersPage.prototype.add = function (placeholder) {
        this.data.object("Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Home/Players/" + placeholder + "/")
            .set(this.thePlayer.Jersey_Number);
        this.data.object("Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Home/check/" + placeholder + "/")
            .set(this.thePlayer.Jersey_Number);
    };
    return TeamMembersPage;
}());
TeamMembersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-team',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/teamMembers/teamMembers.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Player Profile</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<body class="player">\n\n\n<div class="row">\n    <div class="col-md-3">\n        <div style="width: 300px; margin:auto">\n            <div class="card toty fifa17">\n                <div class="player">\n                    <img src="assets/img/Player_Profile.jpg" id="player-card">\n\n                    <div class="avatarholder" style="width: 115px; resize: horizontal ">\n                        //<img src= {{thePlayer.picture}} class="avatar">\n                    </div>\n                    <div class=" name">\n                        <span class="marquee">{{this.thePlayer.FirstName}}</span>\n                    </div>\n                    <div class="attributes ">\n                            <span class="loyalty">\n                            </span>\n                        <span class="runs">{{this.thePlayer.runs}}</span>\n                        <span class="wickets">{{this.thePlayer.wickets}}</span>\n                        <span class="highestScore">{{this.thePlayer.highscore}}</span>\n                        <span class="average">{{this.thePlayer.strikeRate}}</span>\n                        <span class="four">{{this.thePlayer.fours}}</span>\n                        <span class="six">{{this.thePlayer.sixes}}</span>\n\n                    </div>\n                </div>\n                <div class="chemstyle">\n                    <span class="chemstylename">{{this.thePlayer.role}}</span>\n                </div>\n            </div>\n            <button ion-button (click) = "goToaddPlayer()"> Add </button>\n        </div>\n    </div>\n</div>\n\n<div style="height: 20px"></div>\n</body>'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/teamMembers/teamMembers.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], TeamMembersPage);

//# sourceMappingURL=teamMembers.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwayTeamMembersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AwayFindPlayer_AwayFindPlayer__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AwayTeamMembersPage = (function () {
    function AwayTeamMembersPage(navCtrl, navPrams, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.player = {};
        this.key = {};
        this.sideTeam = {};
        this.thePlayer = this.navPrams.get('playerInfo');
        console.log("ThePlayer key: " + this.thePlayer.startKey);
        this.data.object("Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Away/check/amountofPlayers/")
            .subscribe(function (data) {
            _this.NumofPlayers = data.$value;
        });
        this.playerInfo = this.data.list("/Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Away/", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: this.thePlayer.Jersey_Number
            }
        });
        this.playerInfo.take(1).subscribe(function (data) {
            if (data.length === 1) {
                alert("Player with this Jersey Number is already part of the team.");
            }
            if (data.length == 0) {
                var test = 0;
                _this.numPlayer = _this.data.list("Matches/" + _this.thePlayer.startKey + "/MatchStats/PlayerRoster/Away/check/");
                _this.numPlayer.subscribe(function (val) {
                    _this.open = val;
                });
            }
        });
    }
    AwayTeamMembersPage.prototype.goToaddPlayer = function () {
        this.check(this.open);
    };
    AwayTeamMembersPage.prototype.check = function (user) {
        var test = 1;
        var stop = 0;
        stop += this.NumofPlayers;
        this.sideTeam.startKey = this.thePlayer.startKey;
        while (test <= this.NumofPlayers) {
            //console.log("user value: "+ user[test].$key);
            if (user[test].$value == -1) {
                var save;
                save = user[test].$key;
                //console.log("Save: " + save);
                this.add(save);
                break;
            }
            test += 1;
            if (test == stop) {
                alert("You cannot enter more players");
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */], { team: this.sideTeam });
            }
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */], { team: this.sideTeam });
    };
    AwayTeamMembersPage.prototype.add = function (placeholder) {
        this.data.object("Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Away/Players/" + placeholder + "/")
            .set(this.thePlayer.Jersey_Number);
        this.data.object("Matches/" + this.thePlayer.startKey + "/MatchStats/PlayerRoster/Away/check/" + placeholder + "/")
            .set(this.thePlayer.Jersey_Number);
    };
    return AwayTeamMembersPage;
}());
AwayTeamMembersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Awayteam',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/AwayTeamMembers/AwayteamMembers.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Player Profile</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<body class="player">\n\n\n<div class="row">\n    <div class="col-md-3">\n        <div style="width: 300px; margin:auto">\n            <div class="card toty fifa17">\n                <div class="player">\n                    <img src="assets/img/Player_Profile.jpg" id="player-card">\n\n                    <div class="avatarholder" style="width: 115px; resize: horizontal ">\n                        <img src= {{this.thePlayer.picture}} class="avatar">\n                    </div>\n                    <div class=" name">\n                        <span class="marquee">{{this.thePlayer.FirstName}}</span>\n                    </div>\n                    <div class="attributes ">\n                            <span class="loyalty">\n                            </span>\n                        <span class="runs">{{this.thePlayer.runs}}</span>\n                        <span class="wickets">{{this.thePlayer.wickets}}</span>\n                        <span class="highestScore">{{this.thePlayer.highscore}}</span>\n                        <span class="average">{{this.thePlayer.strikeRate}}</span>\n                        <span class="four">{{this.thePlayer.fours}}</span>\n                        <span class="six">{{this.thePlayer.sixes}}</span>\n\n                    </div>\n                </div>\n            </div>\n            <button ion-button (click) = "goToaddPlayer()"> Add </button>\n        </div>\n    </div>\n</div>\n\n<div style="height: 20px"></div>\n</body>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/AwayTeamMembers/AwayteamMembers.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], AwayTeamMembersPage);

//# sourceMappingURL=AwayteamMembers.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__show_show__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = (function () {
    function ProfilePage(navCtrl, navPrams, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.fireauth = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]();
        this.Player = null;
        this.profile = null;
        this.buttonClicked = false;
        this.fireauth.onAuthStateChanged(function (user) {
            if (user) {
                _this.Player = user;
            }
            else {
                _this.Player = null;
            }
        });
    }
    ProfilePage.prototype.card = function () {
        var _this = this;
        this.name = this.data.list("ClubParams/ClubRoster/", {
            query: {
                orderByChild: "email",
                equalTo: this.Player.email
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                console.log('User does not exist');
                alert("Player with this Jersey Number is not in our databasee");
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__show_show__["a" /* ShowPage */], { playerInfo: data });
            }
        });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/Profile/profile.html"*/'<ion-header>\n    <ion-navbar class="bar">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <h4 class="name"> {{this.Player.displayName}} </h4>\n    </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n    <button ion-button  type="button" (click)="check()">Check</button>\n    <button ion-button  type="button" (click)="card()">Profile</button>\n\n</ion-content>\n\n\n\n\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/Profile/profile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TabBasicContentPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemberPage; });
/* unused harmony export FormsPage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabBasicContentPage = (function () {
    function TabBasicContentPage(platform) {
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
    }
    return TabBasicContentPage;
}());
TabBasicContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>Tabs</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content>\n    </ion-content>\n"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
], TabBasicContentPage);

var MemberPage = (function () {
    function MemberPage() {
        this.rootPage = TabBasicContentPage;
    }
    return MemberPage;
}());
MemberPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "\n    <ion-tabs class=\"tabs-basic\">\n      <ion-tab tabTitle=\"Music\" [root]=\"rootPage\"></ion-tab>\n      <ion-tab tabTitle=\"Movies\" [root]=\"rootPage\"></ion-tab>\n      <ion-tab tabTitle=\"Games\" [root]=\"rootPage\"></ion-tab>\n    </ion-tabs>\n"
    })
], MemberPage);

var FormsPage = (function () {
    function FormsPage(formBuilder) {
        this.formBuilder = formBuilder;
        this.todo = this.formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            description: [''],
        });
    }
    FormsPage.prototype.logForm = function () {
        console.log(this.todo.value);
    };
    return FormsPage;
}());
FormsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "\n    <form [formGroup]=\"todo\" (ngSubmit)=\"logForm()\">\n      <ion-item>\n        <ion-label>Todo</ion-label>\n        <ion-input type=\"text\" formControlName=\"title\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Description</ion-label>\n        <ion-textarea formControlName=\"description\"></ion-textarea>\n      </ion-item>\n      <button ion-button type=\"submit\" [disabled]=\"!todo.valid\">Submit</button>\n    </form>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], FormsPage);

//# sourceMappingURL=member.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(327);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_firebase_cofig__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signIn_signIn__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_getter_getter__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_add_add__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Search_search__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_show_show__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_createMatch_createMatch__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_CheckRole_CheckRole__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_teamMembers_teamMembers__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_FindPlayer_FindPlayer__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_AwayFindPlayer_AwayFindPlayer__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_AwayTeamMembers_AwayteamMembers__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_matchOffline_matchOffline__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_extras_extras__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_list_list__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_spectator_spectator__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_member_member__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_Profile_profile__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_splash_screen__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_firebase_firebase__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_google_plus__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_umpire_umpire__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// import { ngOdometer } from '../../bower_components/angular-odometer/dist/angular-odometer.js';

























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signIn_signIn__["a" /* SignInPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_getter_getter__["a" /* GetterPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_add_add__["a" /* AddPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_Search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_show_show__["a" /* ShowPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_createMatch_createMatch__["a" /* CreatePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_teamMembers_teamMembers__["a" /* TeamMembersPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_FindPlayer_FindPlayer__["a" /* FindPlayerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_AwayTeamMembers_AwayteamMembers__["a" /* AwayTeamMembersPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_CheckRole_CheckRole__["a" /* CheckRolePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_matchOffline_matchOffline__["a" /* MatchOfflinePage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_spectator_spectator__["a" /* SpectatorPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_member_member__["a" /* MemberPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_Profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_member_member__["b" /* TabBasicContentPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_umpire_umpire__["a" /* UmpirePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_extras_extras__["a" /* ExtrasPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_5__app_firebase_cofig__["a" /* FIREBASE_CONFIG */]),
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["b" /* AngularFireDatabaseModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signIn_signIn__["a" /* SignInPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_getter_getter__["a" /* GetterPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_add_add__["a" /* AddPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_Search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_matchOffline_matchOffline__["a" /* MatchOfflinePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_show_show__["a" /* ShowPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_createMatch_createMatch__["a" /* CreatePage */],
            // ngOdometer,
            __WEBPACK_IMPORTED_MODULE_15__pages_teamMembers_teamMembers__["a" /* TeamMembersPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_FindPlayer_FindPlayer__["a" /* FindPlayerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_AwayTeamMembers_AwayteamMembers__["a" /* AwayTeamMembersPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_CheckRole_CheckRole__["a" /* CheckRolePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_spectator_spectator__["a" /* SpectatorPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_member_member__["a" /* MemberPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_Profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_member_member__["b" /* TabBasicContentPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_umpire_umpire__["a" /* UmpirePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_extras_extras__["a" /* ExtrasPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_28__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_google_plus__["a" /* GooglePlus */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);

var FIREBASE_CONFIG = {
    apiKey: "AIzaSyD6anW3vwA6GRjWrrdz2L43QEqOVecGrgo",
    authDomain: "davisdragons-b41c9.firebaseapp.com",
    databaseURL: "https://davisdragons-b41c9.firebaseio.com",
    projectId: "davisdragons-b41c9",
    storageBucket: "davisdragons-b41c9.appspot.com",
    messagingSenderId: "881322195809"
};
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');
__WEBPACK_IMPORTED_MODULE_0_firebase__["initializeApp"](FIREBASE_CONFIG);
//# sourceMappingURL=app.firebase.cofig.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signIn_signIn__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_umpire_umpire__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_createMatch_createMatch__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_FindPlayer_FindPlayer__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_AwayFindPlayer_AwayFindPlayer__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, data) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.data = data;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_signIn_signIn__["a" /* SignInPage */];
        this.fireauth = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]();
        this.initializeApp();
        var helloVal = localStorage.getItem("hello");
        if (helloVal) {
            this.access_val = helloVal.toString();
            localStorage.removeItem("hello");
            this.fireauth.onAuthStateChanged(function (user) {
                if (user) {
                    _this.player = user;
                }
                else {
                }
            });
        }
        // used for an example of ngFor and navigation
        this.pages_0 = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Add to Home Team', component: __WEBPACK_IMPORTED_MODULE_12__pages_FindPlayer_FindPlayer__["a" /* FindPlayerPage */] },
            { title: 'Add to Away Team', component: __WEBPACK_IMPORTED_MODULE_13__pages_AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */] },
            { title: 'Spectator', component: __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__["a" /* SpectatorPage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__["a" /* ProfilePage */] },
            { title: 'Umpire', component: __WEBPACK_IMPORTED_MODULE_10__pages_umpire_umpire__["a" /* UmpirePage */] },
            { title: 'Search Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__["a" /* SearchPage */] },
            { title: 'Create Match', component: __WEBPACK_IMPORTED_MODULE_11__pages_createMatch_createMatch__["a" /* CreatePage */] }
        ];
        this.pages_1 = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__["a" /* ProfilePage */] },
            { title: 'Spectator', component: __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__["a" /* SpectatorPage */] },
            { title: 'Umpire', component: __WEBPACK_IMPORTED_MODULE_10__pages_umpire_umpire__["a" /* UmpirePage */] },
            { title: 'Search Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__["a" /* SearchPage */] },
            { title: 'Create Match', component: __WEBPACK_IMPORTED_MODULE_11__pages_createMatch_createMatch__["a" /* CreatePage */] },
        ];
        this.pages_2 = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__["a" /* ProfilePage */] },
            { title: 'Spectator', component: __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__["a" /* SpectatorPage */] },
            { title: 'Search Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__["a" /* SearchPage */] },
        ];
        this.pages_3 = [
            { title: 'Spectator', component: __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__["a" /* SpectatorPage */] },
        ];
        this.pages_4 = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__["a" /* ProfilePage */] },
            { title: 'Spectator', component: __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__["a" /* SpectatorPage */] },
            { title: 'Search Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__["a" /* SearchPage */] },
            { title: 'Add to Home Team', component: __WEBPACK_IMPORTED_MODULE_12__pages_FindPlayer_FindPlayer__["a" /* FindPlayerPage */] },
        ];
        this.pages_5 = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__["a" /* ProfilePage */] },
            { title: 'Spectator', component: __WEBPACK_IMPORTED_MODULE_9__pages_spectator_spectator__["a" /* SpectatorPage */] },
            { title: 'Search Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__["a" /* SearchPage */] },
            { title: 'Add to Away Team', component: __WEBPACK_IMPORTED_MODULE_13__pages_AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */] },
        ];
        this.pages_6 = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */] },
            { title: 'Add to Away Team', component: __WEBPACK_IMPORTED_MODULE_13__pages_AwayFindPlayer_AwayFindPlayer__["a" /* AwayFindPlayerPage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_14__pages_Profile_profile__["a" /* ProfilePage */] },
            { title: 'Search Player', component: __WEBPACK_IMPORTED_MODULE_7__pages_Search_search__["a" /* SearchPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.fireauth.onAuthStateChanged(function (user) {
            if (user) {
                _this.name = _this.data.list("ClubParams/ClubRoster/", {
                    query: {
                        orderByChild: "email",
                        equalTo: user.email
                    }
                });
                _this.name.subscribe(function (data) {
                    if (data.length == 0) {
                        console.log('User does not exist');
                        alert("Player with this Jersey Number is not in our databasee");
                    }
                    else {
                        _this.access_val = data[0].accesslevel;
                    }
                });
            }
            else {
                _this.access_val = 3;
            }
        });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <div center>\n      <ion-avatar>\n      <img style=\'width: 25%; display: block; margin: 0 auto;\' src="assets/img/Welcome.jpg">\n    </ion-avatar>\n      </div>\n     <ion-title text-center>Davis Dragons\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content *ngIf="access_val == null">\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages_0" (click)="openPage(p)">\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n  <ion-content *ngIf="access_val == 1">\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages_1" (click)="openPage(p)">\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n    <ion-content *ngIf="access_val == 2">\n        <ion-list>\n          <button menuClose ion-item *ngFor="let p of pages_2" (click)="openPage(p)">\n            {{p.title}}\n          </button>\n        </ion-list>\n      </ion-content>\n\n      <ion-content *ngIf="access_val == 3">\n          <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages_3" (click)="openPage(p)">\n              {{p.title}}\n            </button>\n          </ion-list>\n        </ion-content>\n\n        <ion-content *ngIf="access_val == 4">\n            <ion-list>\n              <button menuClose ion-item *ngFor="let p of pages_4" (click)="openPage(p)">\n                {{p.title}}\n              </button>\n            </ion-list>\n          </ion-content>\n\n        <ion-content *ngIf="access_val == 5">\n            <ion-list>\n                <button menuClose ion-item *ngFor="let p of pages_4" (click)="openPage(p)">\n                    {{p.title}}\n                </button>\n            </ion-list>\n        </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckRolePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FindPlayer_FindPlayer__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CheckRolePage = (function () {
    function CheckRolePage(navCtrl, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.data = data;
        this.player = {};
        this.key = {};
        this.balls = {};
        this.team = {};
        this.score = {};
        this.captains = {};
        this.cap = {};
        this.side = {};
        this.data.list("/Matches/").subscribe(function (data) {
            _this.Matchname = data;
            _this.NumMatches = data.length;
            console.log(_this.Matchname);
        });
    }
    CheckRolePage.prototype.check = function (key, capt) {
        var verMatch = false;
        this.side.startKey = key.startKey;
        this.cap = capt;
        if (key.startKey == null) {
            alert("Please Enter the Match Key");
        }
        else {
            verMatch = true;
        }
        if (this.cap.Homecaptain == null && this.cap.Awaycaptain == null) {
            alert("Captain enter your Jersey Number");
        }
        else if (this.cap.Homecaptain != null && this.cap.Awaycaptain != null) {
            alert("Captain only fill out one slot. Either Home or Away");
        }
        else {
            console.log(key.startKey);
            this.checkMatch(key, this.cap);
        }
    };
    CheckRolePage.prototype.checkMatch = function (key, captain) {
        var _this = this;
        var confirm1 = false;
        var confirm2 = false;
        var i = 1;
        console.log(this.Matchname);
        while (i < this.NumMatches) {
            console.log(i);
            console.log("Key.MatchKey: " + key.startKey);
            console.log("this.Matchname[i].$key: " + this.Matchname[i].$key);
            if (this.Matchname[i].$key == key.startKey) {
                confirm1 = true;
                console.log("Match exists");
                break;
            }
            i += 1;
            if (i == this.NumMatches) {
                alert("A match with that ID does not exist");
            }
        }
        if (confirm1 == true) {
            console.log("Confirm1 is true");
            this.data.object("/Matches/" + key.startKey + "/MatchStats/PlayerRoster/Home/MainRoles/HomeCaptain/").subscribe(function (data) {
                console.log("Home Cap: " + data.$value);
                _this.CaptainCheckHome = data.$value;
            });
            this.data.object("/Matches/" + key.startKey + "/MatchStats/PlayerRoster/Away/MainRoles/Awaycaptain/").subscribe(function (data) {
                _this.CaptainCheckAway = data.$value;
            });
            if (captain.Homecaptain != null) {
                console.log("Home Captain is not Null");
                if (this.CaptainCheckHome == captain.Homecaptain) {
                    alert("Congrats! You are the Captain of the Home Team");
                    key.squad = "Home";
                    console.log("Saved Value: " + key.squad);
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__FindPlayer_FindPlayer__["a" /* FindPlayerPage */], { team: key });
                }
                else {
                    alert("You Jersey Number does not match the Captain's Jersey Number in our database.");
                    this.cap.Homecaptain = null;
                }
            }
            if (captain.Awaycaptain != null) {
                console.log("Away Captain is not Null");
                if (this.CaptainCheckAway == captain.Awaycaptain) {
                    alert("Congrats! You are the Captain of the Away Team");
                    key.squad = "Away";
                    console.log("Saved Value: " + key.squad);
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__FindPlayer_FindPlayer__["a" /* FindPlayerPage */], { team: key });
                }
                else {
                    alert("You Jersey Number does not match the Captain's Jersey Number in our database.");
                    this.cap.Awaycaptain = null;
                }
            }
        }
    };
    return CheckRolePage;
}());
CheckRolePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-CheckRole',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/CheckRole/CheckRole.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">My Team</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-fab right bottom>\n        <button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n    <ion-list>\n        <ion-list-header text-center class="headfont">  Add Players </ion-list-header>\n        <ion-item>\n            <ion-label floating>Match Key</ion-label>\n            <ion-input type="text"[(ngModel)] = "side.startKey"></ion-input>\n        </ion-item>\n\n\n        <ion-item>\n            <ion-label floating>Home Team Captain Jersey Number</ion-label>\n            <ion-input type="text"[(ngModel)] = "captains.Homecaptain"></ion-input>\n        </ion-item>\n\n        <div class="OR" style="text-align:center">\n            <p>Or</p></div>\n\n        <ion-item>\n            <ion-label floating>Away Team Captain Jersey Number</ion-label>\n            <ion-input type="text"[(ngModel)] = "captains.Awaycaptain"></ion-input>\n        </ion-item>\n\n\n\n    </ion-list>\n\n    <div padding>\n        <button ion-button  type="button" (click)="check(side,captains)">Start Match</button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/CheckRole/CheckRole.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], CheckRolePage);

//# sourceMappingURL=CheckRole.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-left></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-right>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var FirebaseProvider = (function () {
    function FirebaseProvider(http) {
        this.http = http;
        console.log('Hello FirebaseProvider Provider');
    }
    return FirebaseProvider;
}());
FirebaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], FirebaseProvider);

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spectator_spectator__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__umpire_umpire__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = HomePage_1 = (function () {
    function HomePage(navCtrl, fdb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.fdb = fdb;
        this.isLive = false;
        this.matchState = "No Live Match";
        this.intMatchState = 0;
        this.accessLevel = 5;
        HomePage_1.database = fdb;
        this.accessLevel = 5;
        this.name = this.fdb.object('/ClubParams/LiveMatchState/');
        this.name.take(1).subscribe(function (data) {
            console.log("Match State: " + data.matchState);
            _this.intMatchState = data.matchState;
            if (_this.intMatchState === 1) {
                _this.isLive = true;
                _this.matchState = "Match Live!";
            }
            _this.resolveAccessLevel();
        });
    }
    HomePage.getCurrentMatch = function () {
        var key;
        HomePage_1.database.object('/ClubParams/LiveMatchState/').take(1).subscribe(function (data) {
            console.log("Match Ptr: " + data.matchPtr);
            key = data.matchPtr;
            console.log("Key: " + key);
        }); // Finds out the current matchPtr
        return key;
    };
    HomePage.prototype.goToMatch = function () {
        if (this.intMatchState === 1) {
            if (this.accessLevel === 0 || this.accessLevel === 1) {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__umpire_umpire__["a" /* UmpirePage */]);
            }
            else {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__spectator_spectator__["a" /* SpectatorPage */]);
            }
        }
    };
    HomePage.prototype.resolveAccessLevel = function () {
        var _this = this;
        var playerKey = "52";
        this.fdb.list("/ClubParams/AccessLevel/", { preserveSnapshot: true })
            .subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                console.log(snapshot.key, snapshot.val());
                if (snapshot.key === playerKey) {
                    _this.accessLevel = snapshot.val();
                    console.log("Access level is: " + _this.accessLevel);
                }
            });
        });
    };
    return HomePage;
}());
HomePage = HomePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <div text-center>\n    <button ion-button large round [color]="isLive ? \'live\' : \'danger\'" (click) = "goToMatch()">\n    		{{ matchState }}\n    </button>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-content class="card-background-page">\n\n  <ion-card>\n    <img src="assets/img/match4.jpg"/>\n    <div class="card-title">Men In Black vs. Royal Blues</div>\n    <div class="card-subtitle">7th February, 2017</div>\n  </ion-card>\n\n  <ion-card>\n    <img src="assets/img/celebcricket.jpg"/>\n    <div class="card-title">Royal Blues vs. Men In Black</div>\n    <div class="card-subtitle">11th November, 2016</div>\n  </ion-card>\n\n  <ion-card>\n    <img src="assets/img/matchday.jpg"/>\n    <div class="card-title">Royal Blues vs. Men In Black</div>\n    <div class="card-subtitle">15th May, 2016</div>\n  </ion-card>\n\n  <ion-card>\n    <img src="assets/img/anothernetday.jpg"/>\n    <div class="card-title">Dragons In The Nets</div>\n    <div class="card-subtitle">Practice Stats & Leaderboard</div>\n  </ion-card>\n\n</ion-content>\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], HomePage);

var HomePage_1;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UmpirePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matchOffline_matchOffline__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__extras_extras__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import {totalStats} from '../../models/balls';
var UmpirePage = UmpirePage_1 = (function () {
    function UmpirePage(navCtrl, toastCtrl, fdb, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.fdb = fdb;
        this.x = 0;
        this.y = 0;
        this.coin = "";
        this.balls = {};
        this.key = {};
        this.score = {};
        this.key2 = "";
        platform.ready().then(function (readySource) {
            UmpirePage_1.radius = platform.width() / 2;
            UmpirePage_1.height1 = platform.height() / 2;
            _this.computeBoundaries();
        }); //accesses platform to find its height and width
        this.data = fdb.list('/Matches/Match1/Balls');
        this.balls.ballid = 0;
        this.balls.score = 0;
        this.balls.ifExtras = "false";
        this.balls.isWicket = "false";
        this.balls.octant = 0;
        this.score.ballPtr = 0;
        this.score.totalRuns = 0;
        this.score.totalOvers = "";
        this.score.totalWickets = 0;
        this.score.numOfOvers = 0;
        this.key.MatchKey = "0";
        this.name = this.fdb.object('/ClubParams/LiveMatchState/');
        //this.toss_val = this.fdb.list('/Matches/' + this.key.MatchKey + '/MatchStats/Score/Toss');
        this.scoreRef$ = this.fdb.list("/Matches/" + this.key.MatchKey + "/MatchStats/Score/");
        this.matchStats$ = this.fdb.list("/Matches/" + this.key.MatchKey + "/MatchStats/PlayerRoster/Home/MainRoles");
        this.name.take(1).subscribe(function (data) {
            console.log("Match Ptr: " + data);
            _this.key.MatchKey = data.matchPtr;
            _this.name = _this.fdb.object("/Matches/" + _this.key.MatchKey + "/MatchStats/Score/");
            _this.name.take(1).subscribe(function (data2) {
                console.log("constructor ball Ptr: " + data2.ballPtr);
                _this.score.ballPtr = data2.ballPtr;
                _this.score.totalOvers = data2.totalOvers;
                _this.score.totalRuns = data2.totalRuns;
                _this.score.totalWickets = data2.totalWickets;
                var toast = _this.toastCtrl.create({
                    message: 'Welcome! Match:  ' + _this.key.MatchKey + ' Next Ball ID: ' + _this.score.ballPtr + '\nCurrent Score: ' + _this.score.totalRuns + '/' + _this.score.totalWickets + ' (' + _this.score.totalOvers + ')',
                    duration: 5000,
                    position: 'middle'
                });
                toast.present();
            }); // Finds out the corrent matchPtr
        }); // Finds out the corrent matchPtr
    }
    UmpirePage.prototype.computeBoundaries = function () {
        UmpirePage_1.firstXboundary = (UmpirePage_1.radius * 1); //+ UmpirePage.radius; // rcos0
        UmpirePage_1.firstYboundary = (UmpirePage_1.radius * 0); //+ UmpirePage.radius; //rsin0
        UmpirePage_1.secondXboundary = (UmpirePage_1.radius * 0.70710678118); //+ UmpirePage.radius; //rcos45
        UmpirePage_1.secondYboundary = (UmpirePage_1.radius * 0.70710678118); //+ UmpirePage.radius ; //rsin45
        UmpirePage_1.thirdXboundary = (UmpirePage_1.radius * 0); // + UmpirePage.radius; // rcos90
        UmpirePage_1.thirdYboundary = (UmpirePage_1.radius * 1); //+ UmpirePage.radius; // rsin90
        UmpirePage_1.fourthXboundary = (UmpirePage_1.radius * -0.70710678118); //+ UmpirePage.radius; //rcos135
        UmpirePage_1.fourthYboundary = (UmpirePage_1.radius * 0.70710678118); //+ UmpirePage.radius; //rsin135
        UmpirePage_1.fifthXboundary = (UmpirePage_1.radius * -1); //+ UmpirePage.radius; //rcos180
        UmpirePage_1.fifthYboundary = (UmpirePage_1.radius * 0); //+ UmpirePage.radius; //rsin180
        UmpirePage_1.sixthXboundary = (UmpirePage_1.radius * -0.70710678118); // + UmpirePage.radius; //rcos225
        UmpirePage_1.sixthYboundary = (UmpirePage_1.radius * -0.70710678118); //+ UmpirePage.radius; //rsin225
        UmpirePage_1.seventhXboundary = (UmpirePage_1.radius * 0); // + UmpirePage.radius; //rcos270
        UmpirePage_1.seventhYboundary = (UmpirePage_1.radius * -1); // + UmpirePage.radius;  //rsin270
        UmpirePage_1.eigthXboundary = (UmpirePage_1.radius * 0.70710678118); // + UmpirePage.radius; //rcos315
        UmpirePage_1.eigthYboundary = (UmpirePage_1.radius * -0.70710678118); //+ UmpirePage.radius; //rsin315
        UmpirePage_1.ninthXboundary = (UmpirePage_1.radius * 1); //+ UmpirePage.radius; //rcos315
        UmpirePage_1.ninthYboundary = (UmpirePage_1.radius * 0); //+ UmpirePage.radius; //rsin315
    }; // Computes the boundaries required to determine which on eof the eight quadrants
    UmpirePage.prototype.computeOctant = function () {
        console.log(UmpirePage_1.firstXboundary, UmpirePage_1.firstYboundary);
        console.log(UmpirePage_1.secondXboundary, UmpirePage_1.secondYboundary);
        console.log(UmpirePage_1.thirdXboundary, UmpirePage_1.thirdYboundary);
        console.log(UmpirePage_1.fourthXboundary, UmpirePage_1.fourthYboundary);
        console.log(UmpirePage_1.fifthXboundary, UmpirePage_1.fifthYboundary);
        console.log(UmpirePage_1.sixthXboundary, UmpirePage_1.sixthYboundary);
        console.log(UmpirePage_1.seventhXboundary, UmpirePage_1.seventhYboundary);
        console.log(UmpirePage_1.eigthXboundary, UmpirePage_1.eigthYboundary);
        console.log(UmpirePage_1.ninthXboundary, UmpirePage_1.ninthYboundary);
        console.log(UmpirePage_1.radius, UmpirePage_1.radius);
        var xdiff = this.x - UmpirePage_1.radius;
        var ydiff = -this.y + UmpirePage_1.height1;
        console.log("The difference:");
        console.log(xdiff, ydiff);
        if (xdiff > 0 && ydiff > 0) {
            console.log("First Quadrant");
            if (xdiff > UmpirePage_1.secondXboundary && xdiff < UmpirePage_1.firstXboundary) {
                console.log("First Octant");
                this.balls.octant = 1;
            } // checks if first Octant
            else if (xdiff > UmpirePage_1.thirdXboundary && xdiff < UmpirePage_1.secondXboundary) {
                console.log("Second Octant");
                this.balls.octant = 2;
            } // checks if second Octant
        } // checks if first quadrant
        else if (xdiff < 0 && ydiff > 0) {
            console.log("Second Quadrant");
            if (xdiff > UmpirePage_1.fourthXboundary && xdiff < UmpirePage_1.thirdXboundary) {
                console.log("Third Octant");
                this.balls.octant = 3;
            } // checks if 3rd octant
            else if (xdiff > UmpirePage_1.fifthXboundary && xdiff < UmpirePage_1.fourthXboundary) {
                console.log("Fourth Octant");
                this.balls.octant = 4;
            } // checks if 4th octant
        } // check if second quadrant
        else if (xdiff < 0 && ydiff < 0) {
            console.log("Third Quadrant");
            if (xdiff > UmpirePage_1.fifthXboundary && xdiff < UmpirePage_1.sixthXboundary) {
                console.log("Fifth Octant");
                this.balls.octant = 5;
            }
            else if (xdiff > UmpirePage_1.sixthXboundary && xdiff < UmpirePage_1.seventhXboundary) {
                console.log("Sixth Octant");
                this.balls.octant = 6;
            }
        }
        else if (xdiff > 0 && ydiff < 0) {
            console.log("Fourth Quadrant");
            if (xdiff > UmpirePage_1.seventhXboundary && xdiff < UmpirePage_1.eigthXboundary) {
                console.log("Seventh Octant");
                this.balls.octant = 7;
            }
            else if (xdiff > UmpirePage_1.eigthXboundary && xdiff < UmpirePage_1.ninthXboundary) {
                console.log("Eighth Octant");
                this.balls.octant = 8;
            }
        }
    };
    UmpirePage.prototype.increment = function (i) {
        this.balls.score = i;
    }; // increments the score according to the button
    UmpirePage.prototype.computeToss = function () {
        var heads = 0;
        var tails = 0;
        var x;
        var val = "";
        x = (Math.floor(Math.random() * 2) == 0);
        if (x) {
            this.coin = "Heads";
        }
        else {
            this.coin = "Tails";
        }
        alert('It\'s ' + this.coin);
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Toss")
            .set(this.coin);
        document.getElementById('toss').style.display = 'none';
    };
    UmpirePage.prototype.pushdata = function () {
        var _this = this;
        var val = 0;
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Score").take(1).subscribe(function (data) {
            console.log("Get ball ptr: " + data.ballPtr);
            val = data.numOfOvers * 6;
            console.log("Num: " + val);
            _this.score.numOfOvers = data.numOfOvers;
            _this.score.ballPtr = data.ballPtr;
            console.log("Match: " + _this.key.MatchKey);
            if (_this.balls.ballid == val) {
                alert("The Innings have ended!");
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__matchOffline_matchOffline__["a" /* MatchOfflinePage */]);
            }
        });
        this.balls.ballid = this.score.ballPtr;
        this.score.ballPtr = this.score.ballPtr + 1;
        UmpirePage_1.overString = ((Math.floor(this.balls.ballid / 6)).toString()) + '.' + ((this.balls.ballid % 6).toString());
        this.score.totalOvers = UmpirePage_1.overString;
        this.fdb.object("/Matches/" + this.key.MatchKey + "/Balls/" + this.balls.ballid)
            .set(this.balls);
        this.updateTotalScore();
    };
    UmpirePage.prototype.onTap = function (event) {
        this.x = event.srcEvent.offsetX;
        this.y = event.srcEvent.offsetY;
        alert(this.x + ", " + this.y);
        this.computeOctant();
        //console.log(this.x, this.y);
    };
    UmpirePage.prototype.toastScoreFromDB = function () {
        var tempscore = {};
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Score/").take(1).subscribe(function (data) {
            console.log("toast ball Ptr: " + data.ballPtr);
            tempscore.ballPtr = data.ballPtr;
            tempscore.totalOvers = data.totalOvers;
            tempscore.totalRuns = data.totalRuns;
            tempscore.totalWickets = data.totalWickets;
        }); // Finds out the corrent matchPtr
    };
    UmpirePage.prototype.endMatch = function () {
        var boolean = confirm("End Match?");
        if (boolean) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__matchOffline_matchOffline__["a" /* MatchOfflinePage */]);
        }
    };
    UmpirePage.prototype.updateTotalScore = function () {
        var _this = this;
        this.score.totalRuns = this.score.totalRuns + this.balls.score;
        console.log(this.key.MatchKey);
        var val = 0;
        var wickets = 0;
        var answer = false;
        if (this.balls.isWicket == "true") {
            this.score.totalWickets = this.score.totalWickets + 1;
        }
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/PlayerRoster/Away/check/").take(1).subscribe(function (data) {
            console.log("Match: " + _this.key.MatchKey);
            val = parseInt(data.amountofPlayers);
            console.log(val);
            wickets = parseInt(data.amountofPlayers) - 1;
            if (_this.score.totalWickets == val - 1) {
                answer = confirm("Last Man Standing?");
                if (!answer) {
                    if (_this.score.totalWickets == (val - 1) || _this.score.totalWickets > (val - 1)) {
                        alert('This Innings have ended!');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__matchOffline_matchOffline__["a" /* MatchOfflinePage */]);
                    }
                }
            }
            if (_this.score.totalWickets == val || _this.score.totalWickets > val) {
                alert('This Innings have ended!');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__matchOffline_matchOffline__["a" /* MatchOfflinePage */]);
            }
        });
        console.log("Ball ptr local" + this.score.ballPtr);
        var toast = this.toastCtrl.create({
            message: 'Added! New score: ' + this.score.totalRuns + '/' + this.score.totalWickets + '(' + this.score.totalOvers + ')',
            duration: 3000
        });
        toast.present();
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Score/totalRuns/")
            .set(this.score.totalRuns);
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Score/totalWickets/")
            .set(this.score.totalWickets);
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Score/totalOvers/")
            .set(this.score.totalOvers);
        this.fdb.object("/Matches/" + this.key.MatchKey + "/MatchStats/Score/ballPtr/")
            .set(this.score.ballPtr);
        this.balls.isWicket = "false";
    };
    UmpirePage.prototype.dot = function () {
        this.balls.ifExtras = "false";
        this.balls.isWicket = "false";
        this.balls.octant = 0;
        this.balls.score = 0;
    };
    UmpirePage.prototype.wide = function () {
        this.balls.score = 1;
        this.updateTotalScore();
    };
    UmpirePage.prototype.clear = function () {
        document.getElementById('run_button6').style.color = 'goldenrod';
        document.getElementById('run_button6').style.background = '#002855';
        document.getElementById('run_button0').style.color = 'goldenrod';
        document.getElementById('run_button0').style.background = '#002855';
        document.getElementById('run_button1').style.color = 'goldenrod';
        document.getElementById('run_button1').style.background = '#002855';
        document.getElementById('run_button2').style.color = 'goldenrod';
        document.getElementById('run_button2').style.background = '#002855';
        document.getElementById('run_button3').style.color = 'goldenrod';
        document.getElementById('run_button3').style.background = '#002855';
        document.getElementById('run_button4').style.color = 'goldenrod';
        document.getElementById('run_button4').style.background = '#002855';
    };
    UmpirePage.prototype.run_button0 = function () {
        document.getElementById('run_button0').style.color = '#002855';
        document.getElementById('run_button0').style.background = 'goldenrod';
        document.getElementById('run_button1').style.color = 'goldenrod';
        document.getElementById('run_button1').style.background = '#002855';
        document.getElementById('run_button2').style.color = 'goldenrod';
        document.getElementById('run_button2').style.background = '#002855';
        document.getElementById('run_button3').style.color = 'goldenrod';
        document.getElementById('run_button3').style.background = '#002855';
        document.getElementById('run_button4').style.color = 'goldenrod';
        document.getElementById('run_button4').style.background = '#002855';
        document.getElementById('run_button6').style.color = 'goldenrod';
        document.getElementById('run_button6').style.background = '#002855';
    };
    UmpirePage.prototype.run_button1 = function () {
        document.getElementById('run_button1').style.color = '#002855';
        document.getElementById('run_button1').style.background = 'goldenrod';
        document.getElementById('run_button0').style.color = 'goldenrod';
        document.getElementById('run_button0').style.background = '#002855';
        document.getElementById('run_button2').style.color = 'goldenrod';
        document.getElementById('run_button2').style.background = '#002855';
        document.getElementById('run_button3').style.color = 'goldenrod';
        document.getElementById('run_button3').style.background = '#002855';
        document.getElementById('run_button4').style.color = 'goldenrod';
        document.getElementById('run_button4').style.background = '#002855';
        document.getElementById('run_button6').style.color = 'goldenrod';
        document.getElementById('run_button6').style.background = '#002855';
    };
    UmpirePage.prototype.run_button2 = function () {
        document.getElementById('run_button2').style.color = '#002855';
        document.getElementById('run_button2').style.background = 'goldenrod';
        document.getElementById('run_button0').style.color = 'goldenrod';
        document.getElementById('run_button0').style.background = '#002855';
        document.getElementById('run_button1').style.color = 'goldenrod';
        document.getElementById('run_button1').style.background = '#002855';
        document.getElementById('run_button3').style.color = 'goldenrod';
        document.getElementById('run_button3').style.background = '#002855';
        document.getElementById('run_button4').style.color = 'goldenrod';
        document.getElementById('run_button4').style.background = '#002855';
        document.getElementById('run_button6').style.color = 'goldenrod';
        document.getElementById('run_button6').style.background = '#002855';
    };
    UmpirePage.prototype.run_button3 = function () {
        document.getElementById('run_button3').style.color = '#002855';
        document.getElementById('run_button3').style.background = 'goldenrod';
        document.getElementById('run_button0').style.color = 'goldenrod';
        document.getElementById('run_button0').style.background = '#002855';
        document.getElementById('run_button1').style.color = 'goldenrod';
        document.getElementById('run_button1').style.background = '#002855';
        document.getElementById('run_button2').style.color = 'goldenrod';
        document.getElementById('run_button2').style.background = '#002855';
        document.getElementById('run_button4').style.color = 'goldenrod';
        document.getElementById('run_button4').style.background = '#002855';
        document.getElementById('run_button6').style.color = 'goldenrod';
        document.getElementById('run_button6').style.background = '#002855';
    };
    UmpirePage.prototype.run_button4 = function () {
        document.getElementById('run_button4').style.color = '#002855';
        document.getElementById('run_button4').style.background = 'goldenrod';
        document.getElementById('run_button0').style.color = 'goldenrod';
        document.getElementById('run_button0').style.background = '#002855';
        document.getElementById('run_button1').style.color = 'goldenrod';
        document.getElementById('run_button1').style.background = '#002855';
        document.getElementById('run_button2').style.color = 'goldenrod';
        document.getElementById('run_button2').style.background = '#002855';
        document.getElementById('run_button3').style.color = 'goldenrod';
        document.getElementById('run_button3').style.background = '#002855';
        document.getElementById('run_button6').style.color = 'goldenrod';
        document.getElementById('run_button6').style.background = '#002855';
    };
    UmpirePage.prototype.run_button6 = function () {
        document.getElementById('run_button6').style.color = '#002855';
        document.getElementById('run_button6').style.background = 'goldenrod';
        document.getElementById('run_button0').style.color = 'goldenrod';
        document.getElementById('run_button0').style.background = '#002855';
        document.getElementById('run_button1').style.color = 'goldenrod';
        document.getElementById('run_button1').style.background = '#002855';
        document.getElementById('run_button2').style.color = 'goldenrod';
        document.getElementById('run_button2').style.background = '#002855';
        document.getElementById('run_button3').style.color = 'goldenrod';
        document.getElementById('run_button3').style.background = '#002855';
        document.getElementById('run_button4').style.color = 'goldenrod';
        document.getElementById('run_button4').style.background = '#002855';
    };
    UmpirePage.prototype.wicket = function () {
        this.balls.ifExtras = "false";
        this.balls.isWicket = "true";
        this.balls.octant = 0;
        this.balls.score = 0;
    };
    UmpirePage.prototype.goToExtras = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__extras_extras__["a" /* ExtrasPage */]);
    };
    return UmpirePage;
}()); // end of class
UmpirePage.extras = false;
UmpirePage.radius = 0;
UmpirePage.firstXboundary = 0;
UmpirePage.firstYboundary = 0;
UmpirePage.secondXboundary = 0;
UmpirePage.secondYboundary = 0;
UmpirePage.thirdXboundary = 0;
UmpirePage.thirdYboundary = 0;
UmpirePage.fourthXboundary = 0;
UmpirePage.fourthYboundary = 0;
UmpirePage.fifthXboundary = 0;
UmpirePage.fifthYboundary = 0;
UmpirePage.sixthXboundary = 0;
UmpirePage.sixthYboundary = 0;
UmpirePage.seventhXboundary = 0;
UmpirePage.seventhYboundary = 0;
UmpirePage.eigthXboundary = 0;
UmpirePage.eigthYboundary = 0;
UmpirePage.ninthXboundary = 0;
UmpirePage.ninthYboundary = 0;
UmpirePage.overString = "";
UmpirePage.height1 = 0;
UmpirePage.octant = 0;
UmpirePage = UmpirePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/umpire/umpire.html"*/'\n  <ion-content>\n    <div>\n	<button ion-button color="secondary" clear menuToggle>\n		<ion-icon name="menu"></ion-icon>\n	</button>\n  <ion-toolbar no-border-top>\n      <ion-segment [(ngModel)]="players" color="danger">\n          <ion-segment-button value="friends" (ionSelect)="wicket()">\n            OnStrike\n            <div *ngFor ="let item of matchStats$ | async; let i = index; let lst = last">\n             {{item.OnStrike}}\n            </div>\n          </ion-segment-button>\n      <ion-segment-button value="enemies" (ionSelect)="wicket()">\n          <img style="width: 10%;" src="assets/icon/wicket.svg" />\n      </ion-segment-button>\n\n      <ion-segment-button value="home" (ionSelect)="wicket()">\n        OffStrike\n      </ion-segment-button>\n      <ion-segment-button value="away" (ionSelect)="wicket()">\n        <img style="width: 10%;" src="assets/icon/wicket.svg" />\n</ion-segment-button>\n</ion-segment>\n</ion-toolbar>\n\n\n\n    <button ion-button center color ="danger" (click) = \'wicket(); \'>\n    			<img style="width: 15%;" src="assets/icon/wicket.svg" /> wicket\n    </button>\n    <br />\n\n  </div>\n  <div on-tap="onTap($event)">\n  <img style="width: 100%;" src="assets/img/wagonWheelBase.jpg" />\n  </div>\n  <div text-center>\n    <div style="display: none" id="lastMan"><input padding type="checkbox" id="cb">Last Man Standing</div><br>\n    <button ion-button color="secondary" id="run_button1" clear (click) = \'increment(1); run_button1();\'>+1</button>\n    <button ion-button color="secondary" id="run_button2" clear (click) = \'increment(2); run_button2();\' >+2</button>\n    <button ion-button color="secondary" id="run_button3" clear (click) = \'increment(3); run_button3();\'>+3</button>\n    <button ion-button color="secondary" id="run_button4" clear (click) = \'increment(4); run_button4();\' >+4</button>\n    <button ion-button color="secondary" id="run_button6" clear (click) = \'increment(6); run_button6();\'>+6</button>\n    <button ion-button color ="secondary" id="run_button0" clear (click) = \'increment(0); run_button0();\'> Dot </button>\n    <button ion-button color="danger" id="toss" clear (click) = \' computeToss(); \' >Toss</button>\n    <button ion-button color="dark" (click) = \'wide();\' > Wide</button>\n    <button ion-button color="danger" clear (click) = \'increment(); goToExtras(); \' >Extras</button>\n    <button ion-button color="danger" full (click) = \'clear(); pushdata();\' >Go!</button>\n    <button ion-button style="height: 20px;"color ="danger" (click) = \'endMatch(); \'>\n        End Match\n      </button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/umpire/umpire.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
], UmpirePage);

var UmpirePage_1;
//# sourceMappingURL=umpire.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindPlayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__teamMembers_teamMembers__ = __webpack_require__(306);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FindPlayerPage = FindPlayerPage_1 = (function () {
    function FindPlayerPage(navCtrl, navPrams, data) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navPrams = navPrams;
        this.data = data;
        this.player = {};
        this.SidePlayer = {};
        this.side = {};
        this.Checker = null;
        this.data.object("ClubParams/LiveMatchState/matchPtr").subscribe(function (data) {
            console.log("ForNow: " + data.$value);
            _this.forNow = data.$value;
            //console.log("Find Player StartKey: " + this.forNow);
        });
        //console.log("Find Player Squad: " + this.forNow.squad);
        this.data.list("Matches/" + this.forNow + "/MatchStats/PlayerRoster/Home/Players/")
            .subscribe(function (data) {
            _this.HomePlayers = data;
            _this.players = data.length;
            console.log("Player: " + data.length);
            console.log("Home Players: " + _this.HomePlayers);
        });
        this.playerRef$ = this.data.list("ClubParams/ClubRoster");
        this.playerRef$.subscribe(function (data) {
            _this.roster$ = data;
            console.log("Roster: " + data.length);
            _this.roster = data.length;
            console.log("roster$: " + _this.roster$);
        });
        this.Checker = this.HomePlayers;
        var x;
        var y;
        var z;
        x = 0;
        y = 0;
        while (x < this.roster) {
            while (y < this.players) {
                console.log("X: " + x);
                console.log("y: " + y);
                console.log("this.roster$[x].Jersey_Number: " + this.roster$[x].Jersey_Number);
                console.log("this.HomePlayers[y].$value: " + this.HomePlayers[y].$value);
                if (this.roster$[x].Jersey_Number == this.HomePlayers[y].$value) {
                    console.log("this.roster$[x]: " + this.roster$[x]);
                    console.log("this.Checker[z]: " + this.Checker[z]);
                    this.Checker[y] = this.roster$[x];
                }
                y += 1;
            }
            x += 1;
            y = 0;
        }
        //console.log("Checker: " + this.Checker[0]);
    }
    FindPlayerPage.prototype.check = function (player) {
        var _this = this;
        this.name = this.data.list("ClubParams/ClubRoster/", {
            query: {
                orderByChild: "Jersey_Number",
                equalTo: player.Jersey_Number
            }
        });
        this.name.subscribe(function (data) {
            if (data.length == 0) {
                alert("Player with this Jersey Number is not in our databasee");
            }
            else {
                console.log('User does exist');
                console.log("REF DATA: " + data);
                _this.SidePlayer = data[0];
                _this.SidePlayer.startKey = _this.forNow;
                console.log("Startkey: " + _this.forNow);
                console.log("SidePlayer Name: " + _this.SidePlayer.FirstName);
                _this.SidePlayer.picture = " ";
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__teamMembers_teamMembers__["a" /* TeamMembersPage */], { playerInfo: _this.SidePlayer });
            }
        });
        //console.log("SidePlayer Jersey2: " + this.SidePlayer.Jersey_Number);
        //this.navCtrl.push(TeamMembersPage, {playerInfo:this.spot });
    };
    FindPlayerPage.prototype.reload = function () {
        this.navCtrl.push(FindPlayerPage_1);
    };
    return FindPlayerPage;
}());
FindPlayerPage = FindPlayerPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-find',template:/*ion-inline-start:"/Users/Aman/Desktop/dragons1/src/pages/FindPlayer/FindPlayer.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu" ></ion-icon>\n        </button>\n        <ion-title class="bar">Player Search</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-fab right bottom>\n        <button ion-fab color="white"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n    <ion-list>\n        <ion-list-header text-center class="headfont"> Search </ion-list-header>\n        <ion-item>\n            <ion-label floating>Jersey Number</ion-label>\n            <ion-input id ="jr" type="text"[(ngModel)] = "SidePlayer.Jersey_Number"></ion-input>\n        </ion-item>\n\n\n    </ion-list>\n\n    <div padding>\n        <button ion-button  type="button" (click)="check(SidePlayer)">Check</button>\n        <button ion-button  type="button" (click)="reload()">Reload</button>\n\n    </div>\n\n\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-6 col-md-4 col-xl-3 *ngFor ="let item of Checker" >\n                <div class="card toty fifa17">\n                    <div class="player">\n                        <img src="assets/img/Player_Profile.jpg" id="player-card">\n\n                        <div class="avatarholder" >\n                            <img src= {{item.picture}}>\n                        </div>\n                        <div class=" name">\n                            <span class="marquee">{{item.FirstName}}</span>\n                        </div>\n                        <div class="attributes ">\n            <span class="loyalty">\n            </span>\n                            <span class="runs">{{item.runs}}</span>\n                            <span class="wickets">{{item.wickets}}</span>\n                            <span class="highestScore">{{item.highscore}}</span>\n                            <span class="average">{{item.strikeRate}}</span>\n                            <span class="four">{{item.fours}}</span>\n                            <span class="six">{{item.sixes}}</span>\n\n                        </div>\n                    </div>\n                </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Aman/Desktop/dragons1/src/pages/FindPlayer/FindPlayer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], FindPlayerPage);

var FindPlayerPage_1;
//# sourceMappingURL=FindPlayer.js.map

/***/ })

},[310]);
//# sourceMappingURL=main.js.map
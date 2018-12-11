define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      }, {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users',
        auth: true //going to need another route for helptickets around here

      }, {
        route: 'helpTickets',
        moduleId: './modules/helpTickets',
        name: 'helpTickets',
        auth: true
      }, //hopefully what i've written above is correct! added route 12/3
      //ADDING ANOTHER ROUTE ON 12/8 FOR HELP TICKET CONTENTS -- NOT SURE IF CORRECT
      {
        route: 'helpTicketContents',
        moduleId: './modules/helpTickets',
        //there is no module for content, so would it be directed to helptix??
        name: 'helpTicketContents',
        //does the name matter?
        auth: true
      }]);
    };

    return App;
  }(); //your routes are above, explanation in routing video @ 11:00


  _exports.App = App;
});
define('text!app.html',[],function(){return "<template>\n  <nav-bar></nav-bar>\n  <router-view></router-view>\n</template>\n\n";});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "regenerator-runtime", "./auth-config"], function (_exports, _environment, _regeneratorRuntime, _authConfig) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime);
  _authConfig = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  window.regeneratorRuntime = _regeneratorRuntime.default;
  //Configure Bluebird Promises.
  //Note: You may want to use environment-specific configuration.
  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  }); //added above code from ppt that was greyed out and it helped terrible issue!

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editHelpTicket.html',[],function(){return "<!--edited this per what i got from ppt and bit at end of helpticket video-->\r\n<!--might be missing something,yes added some of code from top of editUser.html-->\r\n<!--might try to change some of the lowercase to capitals below HelpTicketContents-->\r\n<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <!--tried fixes here for save but didn't work-->\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <!-- <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>-->\r\n                </div>\r\n                <form>\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"title\">Title</label>\r\n                        <input type=\"text\" readonly.bind=\"helpTicket._id\" class=\"form-control\" value.bind=\"helpTicket.title\"\r\n                            id=\"title\" placeholder=\"Title\">\r\n                    </div>\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"content\">Description</label>\r\n                        <textarea value.bind=\"helpTicketContent.content\" class=\"form-control\" rows=\"8\"></textarea>\r\n                    </div>\r\n                    <!--fixed above typo from helpTicket.content to correct object-->\r\n\r\n                    <!--added code here 12/10-->\r\n                    <div class=\"row\">\r\n                        <div class=\"col-2\">\r\n                            <label class=\"btn btn-primary\">\r\n                                Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                                    files.bind=\"files\">\r\n                            </label>\r\n                        </div>\r\n                        <div class=\"col-10\">\r\n                            <ul>\r\n                                <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                        click.delegate=\"removeFile($index)\" class=\"pull-right\"></li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                    <!--above added 12/10-->\r\n\r\n                    <div class=\"card\" repeat.for=\"content of helpTickets.helpTicketsContentsArray\">\r\n                        <div class=\"card-body\">\r\n                            <div class=\"row\" style=\"padding:3px;\">\r\n                                <div class=\"col-3\">\r\n                                    <span innerhtml.bind=\"content.dateCreated | formatDate\"></span><br />\r\n                                    ${content.personId.firstName} ${content.personId.lastName}\r\n                                </div>\r\n                                <div class=\"col-9\" style=\"border-left-style: solid;border-left-width:1px;\">\r\n                                    ${content.content}\r\n                                </div>\r\n                                <div>\r\n                                    <a href=\"http://localhost:5000/uploadedFiles/helpTickets/${content.file.fileName}\"\r\n                                        target=\"_blank\">${content.file.originalFileName}</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/editUser.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\r\n                </div>\r\n\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"firstName\">First name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.firstName\" id=\"firstName\" placeholder=\"First name\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"lastName\">Last name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.lastName\" id=\"lastName\" placeholder=\"Last name\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlInput1\">Email address</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"exampleFormControlInput1\"\r\n                        placeholder=\"name@example.com\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"inputPassword\" class=\"col-sm-2 col-form-label\">Password</label>\r\n                </div>\r\n                <input type=\"password\" class=\"form-control\" value.bind=\"user.password\" id=\"lastName\" placeholder=\"Password\">\r\n            </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <!---edited 2 lines below per d2l note on 12/3 -->\r\n            <label for=\"role\">Role</label>\r\n            <select value.bind=\"user.role\" class=\"form-control\" id=\"role\">\r\n                <option value=\"user\">User</option>\r\n                <option value=\"staff\">Staff</option>\r\n                <option value=\"admin\">Administrator</option>\r\n            </select>\r\n        </div>\r\n\r\n        <div class=\"form-check\">\r\n            <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n            <label class=\"form-check-label\" for=\"defaultCheck1\">\r\n                Active\r\n            </label>\r\n        </div>\r\n\r\n    </div>\r\n    </div>\r\n    </div>\r\n\r\n</template>";});
define('text!modules/components/tableHelpTickets.html',[],function(){return "<!---took code from tableusers.html, deleted part, and inserted code from ppt on 12/3-->\r\n<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <!--changed other parts of this too-->\r\n                                <span click.trigger=\"newHelpTicket()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"editHelpTicket()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n                        <!--changed other parts of this too-->\r\n                        <tr>\r\n                            <th scope=\"col\">Title</th>\r\n                            <th scope=\"col\">personId</th>\r\n                            <th scope=\"col\">ownerId</th>\r\n                            <th scope=\"col\">Status</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <!---inserted code from slide 4 of helpticks ppt here-->\r\n                        <tr click.trigger=\"editHelpTicket(helpTicket)\" repeat.for=\"helpTicket of helpTickets.helpTicketsArray\">\r\n                            <td>${helpTicket.title}</td>\r\n                            <td>${helpTicket.status}</td>\r\n                            <td>${helpTicket.personId.firstName} ${helpTicket.personId.lastName} </td>\r\n                            <td>${helpTicket.ownerId.firstName} ${helpTicket.ownerId.lastName} </td>\r\n                        </tr>\r\n                        <!--commenting out this checkbox feature\r\n                                    <div class=\"form-check\">\r\n                                        <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\r\n                                            type=\"checkbox\" value=\"\" id=\"defaultCheck1\"></div>\r\n--->\r\n                        </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <span click.trigger=\"newUser()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n\r\n                        <tr>\r\n                            <th scope=\"col\">First</th>\r\n                            <th scope=\"col\">Last</th>\r\n                            <th scope=\"col\">Role</th>\r\n                            <th scope=\"col\">Active</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"user of users.usersArray\">\r\n                            <td click.trigger=\"editUser(user)\">${user.firstName}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.lastName}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.role}</td>\r\n                            <td>\r\n                                <div class=\"form-check\">\r\n                                    <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\r\n                                        type=\"checkbox\" value=\"\" id=\"defaultCheck1\"></div>\r\n\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('modules/helpTickets',["exports", "aurelia-framework", "aurelia-router", "../resources/data/help-ticket-object"], function (_exports, _aureliaFramework, _aureliaRouter, _helpTicketObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.helpTickets = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  //singular
  var //singular
  helpTickets = (_dec = (0, _aureliaFramework.inject)(_helpTicketObject.helpTicket), _dec(_class =
  /*#__PURE__*/
  function () {
    //plural
    //took above from users.js and tried to edit it
    function helpTickets(helpTicket) {
      this.helpTickets = helpTicket;
      this.showHelpTicketEditForm = false; //should this really be false?

      this.userObj = JSON.parse(sessionStorage.getItem('userObj')); //this.showHelpTicketEditForm = false;
      //added line above after looking again at users.js
    }

    var _proto = helpTickets.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.helpTickets.getHelpTickets(this.userObj);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace();
    }; //edited this on 12/8, passing in this.userObj, like activate method above


    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.helpTickets.getHelpTickets(this.userObj);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getHelpTickets() {
        return _getHelpTickets.apply(this, arguments);
      };
    }();

    _proto.newHelpTicket = function newHelpTicket() {
      this.helpTicket = {
        title: "",
        personId: this.userObj._id,
        ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
        status: 'new'
      };
      this.helpTicketContent = {
        personId: this.userObj._id,
        content: ""
      };
      this.showEditForm();
    }; //ensured this was correct on 12/9


    _proto.editHelpTicket =
    /*#__PURE__*/
    function () {
      var _editHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(helpTicket) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.helpTicket = helpTicket;
                this.helpTicketContent = {
                  personId: this.userObj._id,
                  content: ""
                };
                _context3.next = 4;
                return this.helpTickets.getHelpTicketsContents(helpTicket._id);

              case 4:
                //this is as it should be
                this.showEditForm();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function editHelpTicket(_x) {
        return _editHelpTicket.apply(this, arguments);
      };
    }(); //added this from users.js and edited***


    _proto.showEditForm = function showEditForm() {
      this.showHelpTicketEditForm = true; //setTimeout(() => { $("#firstName").focus(); }, 500);
    }; //might need to remove or fix the above code added 12/4


    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _helpTicket, serverResponse;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content)) {
                  _context4.next = 10;
                  break;
                }

                if (this.userObj.role !== 'user') {
                  this.helpTicket.ownerId = this.userObj._id;
                }

                _helpTicket = {
                  helpTicket: this.helpTicket,
                  content: this.helpTicketContent
                };
                _context4.next = 5;
                return this.helpTickets.saveHelpTicket(_helpTicket);

              case 5:
                serverResponse = _context4.sent;
                if (this.filesToUpload && this.filesToUpload.length > 0) this.helpTickets.uploadFile(this.filesToUpload, serverResponse.contentID);
                _context4.next = 9;
                return this.getHelpTickets();

              case 9:
                this.back();

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.back = function back() {
      this.showHelpTicketEditForm = false;
      this.showHelpTicketDisplayForm = false; //added on 12/10, but don't have anywhere else...

      this.filesToUpload = new Array();
      this.files = new Array();
    }; //EXPERIMENTAL CODE HERE FOR CONTENTS, DONT KNOW IF NEEDED 12/9 or instead more needed inside getHelpTickets


    _proto.getHelpTicketsContents =
    /*#__PURE__*/
    function () {
      var _getHelpTicketsContents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.helpTickets.getHelpTicketsContents(_helpTicketObject.helpTicket._id);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getHelpTicketsContents() {
        return _getHelpTicketsContents.apply(this, arguments);
      };
    }(); //added 12/10


    _proto.changeFiles = function changeFiles() {
      var _this = this;

      this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

      for (var i = 0; i < this.files.length; i++) {
        var addFile = true;
        this.filesToUpload.forEach(function (item) {
          if (item.name === _this.files[i].name) addFile = false;
        });
        if (addFile) this.filesToUpload.push(this.files[i]);
      }
    };

    return helpTickets;
  }()) || _class); //things have to go inside this curly bracket

  _exports.helpTickets = helpTickets;
});
define('text!modules/helpTickets.html',[],function(){return "<!--realized i needed this and added it utilising code from users.html-->\r\n<!---was having issue with my form...Hs needed capitalization below\r\nbecause it connects to the code near top of helpTickets.js-->\r\n<template>\r\n            <h1>${message}</h1>\r\n             <compose show.bind=\"showHelpTicketEditForm\" view=\"./components/editHelpTicket.html\"></compose>\r\n        <compose show.bind=\"!showHelpTicketEditForm\" view=\"./components/tableHelpTickets.html\"></compose>\r\n    </template>\r\n\r\n<!--the above should be correct, however if there is an issue with helpTicketEditForm somewhere else, then it may not work-->";});
define('modules/home',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Home = void 0;

  var _dec, _class;

  var ///added AuthService
  Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function Home(router, auth) {
      //added auth
      this.router = router;
      this.auth = auth; //added this line and next one

      this.loginError = '';
      this.message = 'Home';
    }

    var _proto = Home.prototype;

    _proto.login = function login() {
      this.router.navigate('users');
    };

    return Home;
  }()) || _class);
  _exports.Home = Home;
});
define('text!modules/home.html',[],function(){return "<template>\r\n\t<h1>${message}</h1>\r\n</template>";});
define('modules/landing',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Landing = void 0;

  var _dec, _class;

  var ///added AuthService
  Landing = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function Landing(router, auth) {
      //added auth
      this.router = router;
      this.auth = auth; //added this line and next one

      this.loginError = '';
      this.message = 'Home';
    }

    var _proto = Landing.prototype;

    _proto.login = function login() {
      this.router.navigate('users');
    };

    return Landing;
  }()) || _class);
  _exports.Landing = Landing;
});
define('text!modules/landing.html',[],function(){return "<!---realized this was also practically empty, so modeled it after home.html to try it out-->\r\n<template>\r\n        <h1>${message}</h1>\r\n    </template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Users';
      this.showUserEditForm = false;
    }

    var _proto = Users.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    _proto.newUser = function newUser() {
      this.user = {
        firstName: "",
        lastName: "",
        active: true,
        role: "user",
        email: "",
        password: ""
      };
      this.openEditForm();
    };

    _proto.editUser = function editUser(user) {
      this.user = user;
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.user && this.user.firstName && this.user.lastName && this.user.email && this.user.password)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context3.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }(); //and here 12/10 --seemed like it was wrong!


    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.user) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context4.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    _proto.back = function back() {
      this.showUserEditForm = false;
    }; //made a slight variation to this code based on Users video 26:14 mark 11/22        


    return Users;
  }()) || _class);
  _exports.Users = Users;
});
define('text!modules/users.html',[],function(){return "<template>\r\n        <h1>${message}</h1>\r\n         <compose show.bind=\"showUserEditForm\" view=\"./components/editUser.html\"></compose>\r\n    <compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\"></compose>\r\n</template>";});
define('resources/auth-config',[], function () {
  "use strict";
});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DataServices = void 0;

  var _dec, _class;

  //stuff has to go inside the first curly bracket below!
  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            console.log('Requesting ${request.method} ${request.url}');
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            return _request;
          },
          response: function response(_response) {
            console.log('Received ${response.status} ${response.url}');
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class); //stuff has to go inside this curly bracket 

  _exports.DataServices = DataServices;
});
define('resources/data/help-ticket-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.helpTicket = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  //stuff has to be put inside first curly bracket below
  var helpTicket = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    //should be ok
    function helpTicket(data) {
      this.data = data;
      this.HELP_TICKET_SERVICE = 'helpTickets'; //not sure if red part is right

      this.HELP_CONTENT_SERVICE = 'helpTicketContents'; //added s back to content
      //12/8 added line above b/c i think it is needed for the getHelpTicketsContents method at bottom
    } //EDITING MY getHelpTickets BELOW on 12/10 PER EMAIL...
    //get help tickets


    var _proto = helpTicket.prototype;

    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.HELP_TICKET_SERVICE;

                if (userObj.role !== 'staff' && userObj.role !== 'admin') {
                  url += '/user/' + userObj._id;
                }

                _context.next = 4;
                return this.data.get(url);

              case 4:
                response = _context.sent;

                if (!response.error) {
                  this.helpTicketsArray = response;
                } else {
                  this.helpTicketsArray = [];
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getHelpTickets(_x) {
        return _getHelpTickets.apply(this, arguments);
      };
    }(); //save help tickets   


    _proto.saveHelpTicket =
    /*#__PURE__*/
    function () {
      var _saveHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(helpTicket) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!helpTicket) {
                  _context2.next = 11;
                  break;
                }

                if (!helpTicket.helpTicket._id) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.data.put(helpTicket, this.HELP_TICKET_SERVICE);

              case 4:
                serverResponse = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.next = 9;
                return this.data.post(helpTicket, this.HELP_TICKET_SERVICE);

              case 9:
                serverResponse = _context2.sent;

              case 10:
                return _context2.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function saveHelpTicket(_x2) {
        return _saveHelpTicket.apply(this, arguments);
      };
    }(); //updated 12/9


    _proto.getHelpTicketsContents =
    /*#__PURE__*/
    function () {
      var _getHelpTicketsContents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!id) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 3;
                return this.data.get(this.HELP_CONTENT_SERVICE + '/helpTicket/' + id);

              case 3:
                response = _context3.sent;

                if (!response.error) {
                  this.helpTicketsContentsArray = response;
                } else {
                  this.helpTicketsContentsArray = [];
                }

                _context3.next = 8;
                break;

              case 7:
                this.helpTicketsContentsArray = [];

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getHelpTicketsContents(_x3) {
        return _getHelpTicketsContents.apply(this, arguments);
      };
    }();

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(files, id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.uploadFiles(files, this.HELP_CONTENT_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function uploadFile(_x4, _x5) {
        return _uploadFile.apply(this, arguments);
      };
    }();

    return helpTicket;
  }()) || _class); //stuff has to be inside this curly bracket

  _exports.helpTicket = helpTicket;
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  //stuff has to be put inside first curly bracket below
  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 11;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(user && user._id)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _delete(_x2) {
        return _delete2.apply(this, arguments);
      };
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context3.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    return User;
  }()) || _class); //stuff has to be inside this curly bracket

  _exports.User = User;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.authenticated = false; //changed this to true TEMPORARILY!

      this.email = "";
      this.password = "";
    }

    var _proto = NavBar.prototype;

    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginError = "Invalid credentials.";
      });
    };

    _proto.logout = function logout() {
      if (this.userObj) this.auth.logout(this.userObj.email);
      sessionStorage.removeItem('user');
      this.isAuthenticated = this.auth.isAuthenticated();
      this.auth.logout();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<!--PROBABLY GOING TO NEED TO FIX THIS PAGE LATER-->\r\n<template>\r\n    <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n        <a class=\"navbar-brand\" href=\"#\">Help Me!</a>\r\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\"\r\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n        <!--tried adding code below based on aur auth video...\r\n        <div show.bind = \"!isauthenticated\">\r\n            <form class=\"form-inline\"></form>\r\n            <div class =\"form-group mb-2\">\r\n                <imput value.bind=\"email\"type=\"email\"class=\"form-control\"></imput>\r\n        </div>\r\n        ...ends here i think, slight change made below-->\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n            <form show.bind=\"!isAuthenticated\" class=\"form-inline\">\r\n                <div class=\"form-group mb-2\">\r\n                    <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\r\n                    <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"Email\">\r\n                </div>\r\n                <div class=\"form-group mx-sm-3 mb-2\">\r\n                    <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\r\n                    <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\" placeholder=\"Password\">\r\n                </div>\r\n                <button click.trigger=\"login()\" class=\"btn btn-primary mb-2\">Login</button>\r\n                <!--added the line below per instructions on aurelia auth ppt-->\r\n                <span show.bind=\"loginError\" style=\"color: white;margin-left:10px;\">${loginError}</span>\r\n            </form>\r\n            <ul show.bind=\"isAuthenticated\" class=\"navbar-nav\">\r\n                <!---his code had ul ul show.bind-->\r\n                <li class=\"nav-item active\">\r\n                    <a class=\"nav-link\" href=\"#home\">Home <span class=\"sr-only\">(current)</span></a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" show.bind=\"userObj.role === 'admin'\" href=\"#users\">Users</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <!--i know the line below MUST be updated...#helpTickets ?-->\r\n                    <a class=\"nav-link\" href=\"#helpTickets\">Help Tickets</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <!--i think this line below needs to be updated too ?-->\r\n                    <a class=\"nav-link\" href=\"#\" click.trigger=\"logout()\">Logout</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </nav>\r\n</template>";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar', './value-converters/format-date' //added this line 12/3 per last helpticks ppt slide
    ]);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map
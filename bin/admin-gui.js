!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.adminGui=e()}}(function(){return function e(t,i,n){function o(a,s){if(!i[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var u=i[a]={exports:{}};t[a][0].call(u.exports,function(e){var i=t[a][1][e];return o(i?i:e)},u,u.exports,e,t,i,n)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t){if(n(this,e),!t)throw Error("Identity Module not set!");var i=this,o=t._runtimeURL+"/identity-gui";i._guiURL=o,i.identityModule=t,i._messageBus=t.messageBus,i.identityModule.deployGUI(),i.resultURL=void 0,i._messageBus.addListener(o,function(e){var t=(e.body.value,void 0);document.getElementsByTagName("body")[0].style="background-color:white;",parent.postMessage({body:{method:"showAdminPage"},to:"runtime:gui-manager"},"*"),$(".admin-page").removeClass("hide"),i.showIdentitiesGUI(e.body.value).then(function(n){var o=void 0;switch(parent.postMessage({body:{method:"hideAdminPage"},to:"runtime:gui-manager"},"*"),$(".admin-page").addClass("hide"),document.getElementsByTagName("body")[0].style="background-color:transparent",$(".identities-section").addClass("hide"),$(".policies-section").addClass("hide"),n.type){case"idp":t={type:"idp",value:n.value,code:200},o={id:e.id,type:"response",to:e.from,from:e.to,body:t},i._messageBus.postMessage(o);break;case"identity":t={type:"identity",value:n.value,code:200},o={id:e.id,type:"response",to:e.from,from:e.to,body:t},i._messageBus.postMessage(o);break;default:t={type:"error",value:"Error on identity GUI",code:400},o={id:e.id,type:"response",to:e.from,from:e.to,body:t},i._messageBus.postMessage(o)}})}),$(".identities-page-show").on("click",function(){i.showIdentitiesGUI()})}return o(e,[{key:"showIdentitiesGUI",value:function(e){var t=this;return new Promise(function(i,n){var o=void 0,r=void 0;e?(o=e,r=!1):(r=!0,o=t.identityModule.getIdentitiesToChoose()),$(".policies-section").addClass("hide"),$(".identities-section").removeClass("hide"),t.showMyIdentities(o.identities,r).then(function(e){console.log("chosen identity: ",e),i({type:"identity",value:e})});var a=function(e){console.log("chosen identity: ",e),i({type:"identity",value:e})},s=o.idps;$("#idproviders").html(t._getList(s)),$("#idproviders").off(),$("#idproviders").on("click",function(e){return t.obtainNewIdentity(a,r)}),$(".identities-reset").off(),$(".identities-reset").on("click",function(e){return t._resetIdentities(a)})})}},{key:"showMyIdentities",value:function(e,t){var i=this;return new Promise(function(n,o){var r=[];for(var a in e){var s=e[a].split("@");r.push({email:e[a],domain:s[1]})}var l=document.getElementById("my-ids");l.innerHTML="";for(var c=i.createTable(),u=document.createElement("tbody"),d=r.length,p=0;p<d;p++){var f=i.createTableRow(r[p],t);u.appendChild(f)}c.appendChild(u),l.appendChild(c);var g=function(e){n(e)};t||$(".clickable-cell").on("click",function(e){return i.changeID(g)}),$(".remove-id").on("click",function(t){return i.removeID(e)})})}},{key:"createTable",value:function(){var e=document.createElement("table");e.className="centered";var t=document.createElement("thead"),i=document.createElement("tr"),n=document.createElement("th");return n.textContent="Email",i.appendChild(n),t.appendChild(i),e.appendChild(t),e}},{key:"createTableRow",value:function(e,t){var i=document.createElement("tr"),n=document.createElement("td");if(n.textContent=e.email,n.className="clickable-cell",n.style="cursor: pointer",i.appendChild(n),n=document.createElement("td"),t){var o=document.createElement("button");o.textContent="Remove",o.className="remove-id waves-effect waves-light btn",n.appendChild(o)}return i.appendChild(n),i}},{key:"changeID",value:function(e){var t=event.target.innerText;if("settings"!==t)return e(t),t}},{key:"removeID",value:function(e){var t=this,i=event.target.parentNode.parentNode,n=i.children[0].textContent;i.children[1].textContent;t.identityModule.unregisterIdentity(n);for(var o=e.length,r=0;r<o;r++)if(e[r].email===n){e.splice(r,1);break}t.showMyIdentities(e,!0)}},{key:"obtainNewIdentity",value:function(e,t){var i=this,n=event.target.textContent;event.target.text;i.identityModule.crypto.generateRSAKeyPair().then(function(t){var o=btoa(t["public"]);i.identityModule.sendGenerateMessage(o,"origin",void 0,n).then(function(r){console.log("receivedURL: "+r.loginUrl.substring(0,20)+"...");var a=r.loginUrl,s=void 0;if(a.indexOf("redirect_uri")!==-1){var l=a.substring(0,a.indexOf("redirect_uri")),c=a.substring(a.indexOf("redirect_uri"),a.length),u=c.substring(c.indexOf("&"),a.length);s=u.indexOf("&")!==-1?l+"redirect_uri="+location.origin+u:l+"redirect_uri="+location.origin}i.resultURL=s||a,$(".login-idp").html("<p>Chosen IDP: "+n+"</p>"),$(".login").removeClass("hide"),$(".login-btn").off(),$(".login-btn").on("click",function(a){$(".login").addClass("hide"),i._authenticateUser(t,o,r,"origin",n).then(function(t){e(t),i.showIdentitiesGUI()})})})})}},{key:"_getList",value:function(e){for(var t="",i=e.length,n=0;n<i;n++)t+='<li class="divider"></li>',t+='<li><a class="center-align">'+e[n]+"</a></li>";return t}},{key:"_authenticateUser",value:function(e,t,i,n,o){var r=this,a=r.resultURL;return new Promise(function(i,s){r.identityModule.openPopup(a).then(function(a){r.identityModule.sendGenerateMessage(t,n,a,o).then(function(t){t?r.identityModule.storeIdentity(t,e).then(function(e){i(e.userProfile.username)},function(e){s(e)}):s("error on obtaining identity information")})},function(e){s(e)})})}},{key:"_resetIdentities",value:function(){console.log("_resetIdentities")}}]),e}();i["default"]=r},{}],2:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=e("./PoliciesManager"),s=n(a),l=function(){function e(t){if(o(this,e),!t)throw Error("Policy Engine is not set!");this.policiesManager=new s["default"](t),this.elements=this._setElements(),this._setListeners()}return r(e,[{key:"_addMember",value:function(){var e=this,t=event.target.id;$(".member-new-intro").html('<h5>Add a member to a group</h5><p>Insert a user email below to add to the "'+t+'" group.</p>'),$(".member-new-modal").openModal(),$(".member-new-ok").off(),$(".member-new-ok").on("click",function(i){var n=$("#member-new").val();$("#member-new").val(""),e.policiesManager.addToGroup(t,n),$(".member-new-modal").closeModal(),e._manageGroups()})}},{key:"_createGroup",value:function(){var e=this;$("#group-new-name").val(""),$(".group-new-modal").openModal(),$(".group-new-ok").on("click",function(t){var i=$("#group-new-name").val();e.policiesManager.createGroup(i),e._manageGroups()})}},{key:"_addPolicy",value:function(){var e=this;$("#policy-new-title").val(""),$(".combining").html("");var t=["Block overrides","Allow overrides","First applicable"];$(".combining").append(this._getOptions("comb-algorithm","Choose a combining algorithm",t)),$(".policy-new").openModal(),$(".policy-new-ok").off(),$(".policy-new-ok").on("click",function(t){var i=$("#policy-new-title").val();if(i){var n=$("#comb-algorithm").val();e.policiesManager.addPolicy(i,n),$(".help-menu").addClass("hide"),$(".policy-new").closeModal(),e._goHome()}else Materialize.toast("Invalid policy title",4e3)}),$(".help-btn").off(),$(".help-btn").on("click",function(e){$(".help-menu").removeClass("hide")})}},{key:"_decreaseRulePriority",value:function(){var e=event.target.closest("tr").id,t=e.split(":"),i=parseInt(t[t.length-1]);t.pop();var n=t.join(":"),o=this.policiesManager.getPolicy(n).getLastPriority();if(o!=i){var r=parseInt(i+1);this.policiesManager.decreaseRulePriority(n,i,r),this._goHome()}}},{key:"_deleteMember",value:function(){var e=event.target.closest("tr").id,t=e.split("::"),i=t[t.length-1];t.pop();var n=t.join("::");this.policiesManager.removeFromGroup(n,i),this._manageGroups()}},{key:"_deleteGroup",value:function(){var e=event.target.closest("tr").children[0].id;this.policiesManager.deleteGroup(e),this._manageGroups()}},{key:"_deletePolicy",value:function(){var e=event.target.closest("tr").id;this.policiesManager.deletePolicy(e),this._goHome()}},{key:"_deleteRule",value:function(){var e=event.target.closest("tr").id,t=e.split(":"),i=t[t.length-1];t.pop();var n=t.join(":"),o=this.policiesManager.getRuleOfPolicy(n,i);this.policiesManager.deleteRule(n,o),this._goHome()}},{key:"_getActivePolicy",value:function(){var e=this;$(".policy-active").html("");var t=this.policiesManager.getActivePolicy(),i=this.policiesManager.getPoliciesTitles();i.push("Deactivate all policies"),$(".policy-active").append(this._getOptions("policies-list","Click to activate a policy",i,t)),$("#policies-list").on("click",function(t){var i=$("#policies-list").find(":selected")[0].textContent;"Deactivate all policies"===i&&(i=void 0),e.policiesManager.updateActivePolicy(i)})}},{key:"_getGroupOptions",value:function(e,t,i,n){var o="<option disabled selected>"+e+"</option>";for(var r in t){o+="<optgroup label="+t[r]+">";for(var a in n[r])o+='<option id="'+i[r]+'">'+n[r][a]+"</option>"}return o}},{key:"_getInfo",value:function(e){var t=void 0;switch(e){case"Date":if(t=$(".config").find("input").val(),t.indexOf(",")!==-1){var i=t.split(" ");i[1]=i[1].substring(0,i[1].length-1);var n=["January","February","March","April","May","June","July","August","September","October","November","December"];t=i[0]+"/"+(n.indexOf(i[1])+1)+"/"+i[2]}else{var o=t.split("-");t=o[2]+"/"+o[1]+"/"+o[0]}break;case"Group of users":t=$("#group").find(":selected").text();break;case"Subscription preferences":(t=void 0!==$("input[name='rule-new-subscription']:checked")[0])&&(t=$("input[name='rule-new-subscription']:checked")[0].id);break;case"Weekday":t=$("#weekday").find(":selected").text();break;default:t=$(".config").find("input").val()}return t}},{key:"_getList",value:function(e){for(var t="",i=e.length,n=0;n<i;n++)t+='<li class="divider"></li>',t+='<li><a class="center-align">'+e[n]+"</a></li>";return t}},{key:"_getOptions",value:function(e,t,i,n){var o='<select id="'+e+'" class="browser-default"><option disabled selected>'+t+"</option>";for(var r in i)o+=void 0!==n&n===i[r]?'<option selected id="'+e+'">'+i[r]+"</option>":'<option id="'+e+'">'+i[r]+"</option>";return o+="</select>"}},{key:"_getPoliciesTable",value:function(){var e=this;$(".policies-no").addClass("hide"),$(".policies-current").html("");var t=this.policiesManager.getFormattedPolicies(),i=[],n=[],o=[];for(var r in t)i.push(t[r].title),n.push(t[r].rulesTitles),o.push(t[r].ids);var a="<table>",s=0===i.length;for(var l in i){a+='<thead><tr id="'+i[l]+'"><td></td><td></td><th class="center-align">'+i[l]+'</th><td><i class="material-icons clickable-cell policy-delete" style="cursor: pointer; vertical-align: middle">delete_forever</i></td></tr></thead><tbody>';for(var c in n[l])a+='<tr id="'+o[l][c]+'" ><td><i class="material-icons clickable-cell rule-priority-increase" style="cursor: pointer; vertical-align: middle">arrow_upward</i></td><td><i class="material-icons clickable-cell rule-priority-decrease" style="cursor: pointer; vertical-align: middle">arrow_downward</i></td><td class="rule-show clickable-cell" style="cursor: pointer">'+n[l][c]+'</td><td><i class="material-icons clickable-cell rule-delete" style="cursor: pointer; vertical-align: middle">clear</i></td></tr>';a+='<tr id="'+i[l]+'"></td><td></td><td></td><td style="text-align:center"><i class="material-icons clickable-cell center-align rule-add" style="cursor: pointer">add_circle</i></td></tr>'}s?$(".policies-no").removeClass("hide"):(a+="</tbody></table>",$(".policies-current").append(a)),$(".rule-add").on("click",function(t){e._showVariablesTypes()}),$(".rule-delete").on("click",function(t){e._deleteRule()}),$(".rule-show").on("click",function(t){e._showRule()}),$(".rule-priority-increase").on("click",function(t){e._increaseRulePriority()}),$(".rule-priority-decrease").on("click",function(t){e._decreaseRulePriority()}),$(".policy-add").off(),$(".policy-add").on("click",function(t){e._addPolicy()}),$(".policy-delete").on("click",function(t){e._deletePolicy()})}},{key:"_goHome",value:function(){this._getActivePolicy(),this._getPoliciesTable()}},{key:"_increaseRulePriority",value:function(){var e=event.target.closest("tr").id,t=e.split(":"),i=parseInt(t[t.length-1]);if(0!==i){t.pop();var n=t.join(":"),o=i-1;this.policiesManager.increaseRulePriority(n,i,o),this._goHome()}}},{key:"_manageGroups",value:function(){var e=this;$(".groups-current").html("");var t=this.policiesManager.getGroups(),i=t.groupsNames,n=t.members,o=t.ids,r="<table>",a=0===i.length;for(var s in i){r+='<thead><tr><th id="'+i[s]+'">'+i[s]+'</th><td style="text-align:right"><i class="material-icons clickable-cell group-delete" style="cursor: pointer; vertical-align: middle">delete_forever</i></td></tr></thead><tbody>';for(var l in n[s])r+='<tr id="'+o[s][l]+'" ><td style="cursor: pointer">'+n[s][l]+'</td><td style="text-align:right"><i class="material-icons clickable-cell member-delete" style="cursor: pointer; vertical-align: middle">clear</i></td></tr>';r+='<tr id="'+i[s]+'"><td><i class="material-icons clickable-cell member-add" id="'+i[s]+'" style="cursor: pointer">add_circle</i></td></tr>'}a?$(".groups-current").append("<p>There are no groups set.</p>"):(r+="</tbody></table>",$(".groups-current").append(r)),$(".member-add").off(),$(".member-add").on("click",function(t){e._addMember()}),$(".member-delete").on("click",function(t){e._deleteMember()}),$(".group-add").off(),$(".group-add").on("click",function(t){e._createGroup()}),$(".group-delete").on("click",function(t){e._deleteGroup()})}},{key:"_parseFileContent",value:function(e){var t=JSON.parse(e);for(var i in t)this.policiesManager.addPolicy(i,void 0,t[i]);$(".policy-new").closeModal()}},{key:"_setElements",value:function(){var e=this;return{date:function(e){return'<input type="date" class="datepicker">'},select:function(t){return e._getOptions(t[0],t[1],t[2])},form:function(e){return'<form><input type="text" placeholder="'+e+'"></input></form>'}}}},{key:"_showNewConfigurationPanel",value:function(e){var t=event.target.text;$(".variable").html(this._getNewConfiguration(e,t)),$(".scopes").empty().html("");var i=["Email","Hyperty","All"],n=["identity","hyperty","global"],o=[];o.push(this.policiesManager.getMyEmails()),o.push(this.policiesManager.getMyHyperties()),o.push(["All identities and hyperties"]),$(".scopes").append(this._getGroupOptions("Apply this configuration to:",i,n,o)),$(".variable").removeClass("hide")}},{key:"_showVariablesTypes",value:function(){var e=this,t=event.target.closest("tr").id;$("#variables-types").empty().html("");var i=this.policiesManager.getVariables();$("#variables-types").append(this._getList(i)),$(".variable").addClass("hide"),$(".rule-new").openModal(),$("#variables-types").off(),$("#variables-types").on("click",function(i){e._showNewConfigurationPanel(t)})}},{key:"_getNewConfiguration",value:function(e,t){var i=this,n=this.policiesManager.getVariableInfo(t);if($(".rule-new-title").html(n.title),$(".description").html(n.description),$(".config").html(""),"Subscription preferences"===t)$(".subscription-type").removeClass("hide");else{$(".subscription-type").addClass("hide");var o=n.input;for(var r in o)"Group of users"===t&&o[r][1].push(this.policiesManager.getGroupsNames()),$(".config").append(this.elements[o[r][0]](o[r][1])),"Group of users"===t&&o[r][1].pop();"date"===t&&$(".datepicker").pickadate({selectMonths:!0,selectYears:15})}document.getElementById("allow").checked=!1,document.getElementById("block").checked=!1,$(".ok-btn").off(),$(".ok-btn").on("click",function(n){if(void 0===$("input[name='rule-new-decision']:checked")[0])throw Error("INFORMATION MISSING: please specify an authorisation decision.");var o=i._getInfo(t),r=$("input[name='rule-new-decision']:checked")[0].id;r="allow"===r;var a=$(".scopes").find(":selected")[0].id,s=$(".scopes").find(":selected")[0].textContent;s="All identities and hyperties"===s?"global":s,i.policiesManager.setInfo(t,e,o,r,a,s),$(".rule-new").closeModal(),i._goHome()})}},{key:"_deleteInfo",value:function(e){var t=event.target.closest("tr").id,i=t.split(":"),n=i[0];i.shift();var o=i.join(""),r=event.target.closest("tr").children[0].id;this.policiesManager.deleteInfo(e,n,o,r),this._goHome()}},{key:"_setListeners",value:function(){var e=this;$(".settings-btn").on("click",function(e){parent.postMessage({body:{method:"showAdminPage"},to:"runtime:gui-manager"},"*"),$(".admin-page").removeClass("hide"),document.getElementsByTagName("body")[0].style="background-color:white;"}),$(".policies-page-show").on("click",function(t){$(".policies-section").removeClass("hide"),$(".identities-section").addClass("hide"),e._goHome(),e._manageGroups()}),$(".admin-page-exit").on("click",function(e){parent.postMessage({body:{method:"hideAdminPage"},to:"runtime:gui-manager"},"*"),$(".admin-page").addClass("hide"),document.getElementsByTagName("body")[0].style="background-color:transparent;"}),$(".exit-btn").on("click",function(e){$(".subscription-type").addClass("hide"),$(".help-menu").addClass("hide")}),$("#policy-file").on("change",function(t){var i=t.target.files[0],n=new FileReader;n.readAsText(i,"UTF-8"),n.onload=function(t){e._parseFileContent(t.target.result),e._goHome()},n.onerror=function(e){throw Error("Error reading the file")}})}},{key:"_showRule",value:function(){var e=this,t=event.target.textContent,i=event.target.closest("tr").id,n=i.split(":"),o=n[n.length-1];n.pop();var r=n.join(":"),a=this.policiesManager.getRuleOfPolicy(r,o);if("subscription"===a.condition.attribute&&"preauthorised"===a.condition.params)$(".authorise-btns").addClass("hide");else{var s=void 0;s=a.decision?document.getElementById("btn-allow"):document.getElementById("btn-block"),s.checked=!0,$(".authorise-btns").removeClass("hide")}$(".member-add").addClass("hide"),$(".member-new-btn").addClass("hide"),$(".rule-details").openModal(),$(".rule-title").html("<h5><b>"+t+"</b></h5>"),"subscription"===a.condition.attribute&&$(".subscription-type").removeClass("hide"),$(".subscription-decision").on("click",function(t){e._updateRule("subscription",r,a)}),$(".decision").off(),$(".decision").on("click",function(t){e._updateRule("authorisation",r,a)})}},{key:"_updateRule",value:function(e,t,i){var n=$(".rule-title").text(),o=n.split(" "),r=o.indexOf("is");switch(r===-1&&(r=o.indexOf("are")),e){case"authorisation":var a=$("input[name='rule-update-decision']:checked")[0].id;"btn-allow"===a?(o[r+1]="allowed",a=!0):(o[r+1]="blocked",a=!1),n=o.join(" "),$(".rule-title").html("<h5><b>"+n+"</b></h5>"),this.policiesManager.updatePolicy(t,i,a);break;case"subscription":var s=event.target.labels[0].textContent;o[r+1];o=n.split("hyperties are"),"All subscribers"===s?($(".authorise-btns").removeClass("hide"),a=i.decision,s="*",n="Subscriptions from all hyperties are"+o[1]):($(".authorise-btns").addClass("hide"),a=!0,s="preauthorised",n="Subscriptions from previously authorised hyperties are"+o[1]),$(".rule-title").html("<h5><b>"+n+"</b></h5>"),this.policiesManager.updatePolicy(t,i,a,s)}this._goHome()}}]),e}();i["default"]=l},{"./PoliciesManager":3}],3:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t){n(this,e),this.policyEngine=t,this.policies=this.policyEngine.context.userPolicies,this.variables=this.setVariables(),this.addition=this.setAdditionMethods(),this.validation=this.setValidationMethods()}return o(e,[{key:"addToGroup",value:function(e,t){this.policyEngine.context.addToGroup(e,t)}},{key:"createGroup",value:function(e){this.policyEngine.context.createGroup(e)}},{key:"addPolicy",value:function(e,t,i){if(void 0===i)switch(t){case"Block overrides":t="blockOverrides";break;case"Allow overrides":t="allowOverrides";break;case"First applicable":t="firstApplicable";break;default:t=void 0}this.policyEngine.addPolicy("USER",e,i,t)}},{key:"decreaseRulePriority",value:function(e,t,i){this.getRuleOfPolicy(e,i).priority=t,this.getRuleOfPolicy(e,t).priority=i,this.policyEngine.context.savePolicies("USER")}},{key:"deleteGroup",value:function(e){this.policyEngine.context.deleteGroup(e)}},{key:"deletePolicy",value:function(e){this.policyEngine.removePolicy("USER",e)}},{key:"deleteRule",value:function(e,t){var i=this.policyEngine.context.userPolicies;i[e].deleteRule(t),this.policyEngine.context.savePolicies("USER")}},{key:"getActivePolicy",value:function(){return this.policyEngine.context.activeUserPolicy}},{key:"getPolicy",value:function(e){return this.policyEngine.context.userPolicies[e]}},{key:"getPoliciesTitles",value:function(){var e=this.policyEngine.context.userPolicies,t=[];for(var i in e)t.push(i);return t}},{key:"getTargets",value:function(e){var t=[];for(var i in this.policies[e])t.indexOf(i)===-1&&t.push(i);return t}},{key:"increaseRulePriority",value:function(e,t,i){this.getRuleOfPolicy(e,t).priority=i,this.getRuleOfPolicy(e,i).priority=t,this.policyEngine.context.savePolicies("USER")}},{key:"setVariables",value:function(){return{Date:{title:"<br><h5>Updating date related configurations</h5><p>Incoming communications in the introduced date will be allowed or blocked according to your configurations, which can be changed in the preferences page.</p><br>",description:"<p>Date:</p>",input:[["date",[]]]},Domain:{title:"<br><h5>Updating domain configurations</h5><p>Incoming communications from a user whose identity is from the introduced domain allowed or blocked according to your configurations, which can be changed in the preferences page.</p><br>",description:"<p>Domain:</p>",input:[["form",[]]]},"Group of users":{title:"<br><h5>Updating groups configurations</h5><p>Incoming communications from a user whose identity is in the introduced group will be allowed or blocked according to your configurations, which can be changed in the preferences page.</p><br>",description:"<p>Group name:</p>",input:[["select",["group","Select a group:"]]]},"Subscription preferences":{title:"<br><h5>Updating subscriptions configurations</h5><p>The acceptance of subscriptions to your hyperties will be allowed or blocked according to your configurations, which can be changed in the preferences page.</p><br>",input:[]},"Time of the day":{title:'<br><h5>Updating time configurations</h5><p>Incoming communications in the introduced timeslot will be blocked, but this can be changed in the preferences page.</p><p>Please introduce a new timeslot in the following format:</p><p class="center-align">&lt;START-HOUR&gt;:&lt;START-MINUTES&gt; to &lt;END-HOUR&gt;:&lt;END-MINUTES&gt;</p><br>',description:"<p>Timeslot:</p>",input:[["form",[]]]},Weekday:{title:"<br><h5>Updating weekday configurations</h5><p>Incoming communications in the introduced weekday will be allowed or blocked according to your configurations, which can be changed in the preferences page.</p><br>",description:"<p>Weekday:</p>",input:[["select",["weekday","Select a weekday:",["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]]]]}}}},{key:"setAdditionMethods",value:function(){var e=this;return{Date:function(t){var i=t[0],n=e.policyEngine.context.userPolicies;n[i].createRule(t[4],{attribute:"date",operator:"equals",params:t[3]},t[1],t[2]),e.policyEngine.context.savePolicies("USER")},Domain:function(t){var i=t[0],n=e.policyEngine.context.userPolicies;n[i].createRule(t[4],{attribute:"domain",operator:"equals",params:t[3]},t[1],t[2]),e.policyEngine.context.savePolicies("USER")},"Group of users":function(t){var i=t[0],n=e.policyEngine.context.userPolicies;n[i].createRule(t[4],{attribute:"source",operator:"in",params:t[3]},t[1],t[2]),e.policyEngine.context.savePolicies("USER")},"Subscription preferences":function(t){var i=t[0],n=e.policyEngine.context.userPolicies,o="equals";"preauthorised"===t[3]&&(o="in"),n[i].createRule(t[4],{attribute:"subscription",operator:thisOperator,params:t[3]},t[1],t[2]),e.policyEngine.context.savePolicies("USER")},"Time of the day":function(t){var i=t[0],n=e.policyEngine.context.userPolicies;t[3]=t[3].split(" to ");var o=t[3][0].split(":");o=o.join("");var r=t[3][1].split(":");r=r.join(""),n[i].createRule(t[4],{attribute:"time",operator:"between",params:[o,r]},t[1],t[2]),e.policyEngine.context.savePolicies("USER")},Weekday:function(t){var i=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];t[3]=i.indexOf(t[3]);var n=t[0],o=e.policyEngine.context.userPolicies;o[n].createRule(t[4],{attribute:"weekday",operator:"equals",params:t[3]},t[1],t[2]),e.policyEngine.context.savePolicies("USER")}}}},{key:"setValidationMethods",value:function(){var e=this;return{Date:function(t,i){return e.isValidDate(i)&e.isValidScope(t)},"Group of users":function(t,i){return e.isValidString(i)&e.isValidScope(t)},Domain:function(t,i){return e.isValidDomain(i)&e.isValidScope(t)},Weekday:function(t,i){return!0&e.isValidScope(t)},"Subscription preferences":function(t,i){return e.isValidSubscriptionType(i)&e.isValidScope(t)},"Time of the day":function(t,i){return e.isValidTimeslot(i)&e.isValidScope(t)}}}},{key:"updateActivePolicy",value:function(e){this.policyEngine.context.activeUserPolicy=e,this.policyEngine.context.saveActivePolicy()}},{key:"isValidEmail",value:function(e){var t=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;return t.test(e)}},{key:"isValidDomain",value:function(e){var t=/[a-z0-9.-]+\.[a-z]{2,3}$/;return t.test(e)}},{key:"isValidString",value:function(e){var t=/[a-z0-9.-]$/;return t.test(e)}},{key:"isValidSubscriptionType",value:function(e){return!0}},{key:"isValidDate",value:function(e){var t=e.split("/"),i=parseInt(t[0]),n=parseInt(t[1]),o=parseInt(t[2]),r=new Date(o,n-1,i),a=r.getFullYear()===o&&r.getMonth()+1===n&&r.getDate()===i,s=(r.getDate()+"/"+(r.getMonth()+1)+"/"+r.getFullYear(),new Date),l=(s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear(),!1);return r.getFullYear()>s.getFullYear()?l=!0:r.getFullYear()==s.getFullYear()&&(r.getMonth()+1>s.getMonth()+1?l=!0:r.getMonth()+1==s.getMonth()+1&&r.getDate()>=s.getDate()&&(l=!0)),a&&l}},{key:"isValidScope",value:function(e){return""!==e}},{key:"isValidTimeslot",value:function(e){if(!e)return!1;var t=e.split(" to "),i=2===t.length;if(!i)return!1;var n=t[0].split(":"),o=t[1].split(":");if(2!==n.length||2!==o.length)return!1;var r=2===n[0].length&&2===n[1].length&&2===o[0].length&&2===o[1].length,a=n[0]==parseInt(n[0],10)&&n[1]==parseInt(n[1],10)&&o[0]==parseInt(o[0],10)&&o[1]==parseInt(o[1],10);return i&&r&&a}},{key:"getFormattedPolicies",value:function(){var e=this.policyEngine.context.userPolicies,t=[];for(var i in e){var n={title:e[i].key,rulesTitles:[],ids:[]};if(0!==e[i].rules.length){e[i].rules=e[i].sortRules();for(var o in e[i].rules){var r=this._getTitle(e[i].rules[o]);n.rulesTitles.push(r),n.ids.push(n.title+":"+e[i].rules[o].priority)}}t.push(n)}return t}},{key:"getRuleOfPolicy",value:function(e,t){var i=this.policyEngine.context.userPolicies,n=i[e];return n.getRuleByPriority(t)}},{key:"_getTitle",value:function(e){var t=e.condition,i=e.decision?"allowed":"blocked",n="global"===e.target?"All identities and hyperties":e.target,o=t.attribute;switch(o){case"date":return"Date "+t.params+" is "+i+" ("+n+")";case"domain":return'Domain "'+t.params+'" is '+i+" ("+n+")";case"source":if("in"===t.operator)return'Group "'+t.params+'" is '+i+" ("+n+")";if("equals"===t.operator)return"User "+t.params+" is "+i+" ("+n+")";case"subscription":if("*"===t.params)return"Subscriptions from all hyperties are "+i+" ("+n+")";if("preauthorised"===t.params)return"Subscriptions from previously authorised hyperties are allowed ("+n+")";case"time":var r=t.params[0][0]+t.params[0][1]+":"+t.params[0][2]+t.params[0][3],a=t.params[1][0]+t.params[1][1]+":"+t.params[1][2]+t.params[1][3];return"Timeslot from "+r+" to "+a+" is "+i+" ("+n+")";case"weekday":var s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=t.params;return'Weekday "'+s[l]+'" is '+i+" ("+n+")";default:return"Rule "+e.priority+" is "+i+" ("+n+")"}}},{key:"getVariables",value:function(){var e=[];for(var t in this.variables)e.push(t);return e}},{key:"getVariableInfo",value:function(e){return this.variables[e]}},{key:"getMyEmails",value:function(){return this.policyEngine.context.getMyEmails()}},{key:"getMyHyperties",value:function(){return this.policyEngine.context.getMyHyperties()}},{key:"setInfo",value:function(e,t,i,n,o,r){if(!this.validation[e](o,i))throw Error("Invalid configuration");this.addition[e]([t,o,r,i,n])}},{key:"getInfo",value:function(e,t){var i=this.policies[e],n={};for(var o in i)i[o].condition===t&&(n=i[o]);if(n!=={}){var r=n.condition.split(" ");return this.policyEngine.getList(e,r[2])}throw Error("Policy <"+t+"> not found!")}},{key:"deleteInfo",value:function(e,t,i,n){var o=[t,i,n];if("member"===e){var r=n.split(" "),a=r[2];o=[t,a,n]}this.deletion[e](o)}},{key:"getGroup",value:function(e,t,i){return this.policyEngine.context.getGroup(e,t,i)}},{key:"getGroups",value:function(){var e=this.policyEngine.context.groups,t={groupsNames:[],members:[],ids:[]};for(var i in e){t.groupsNames.push(i),t.members.push(e[i]);var n=[];for(var o in e[i])n.push(i+"::"+e[i][o]);t.ids.push(n)}return t}},{key:"getGroupsNames",value:function(){return this.policyEngine.context.getGroupsNames()}},{key:"removeFromGroup",value:function(e,t){this.policyEngine.context.removeFromGroup(e,t)}},{key:"updatePolicy",value:function(e,t,i,n){var o=this.policyEngine.context.userPolicies;if(o[e].deleteRule(t),n){var r="*"===n?"equals":"in";o[e].createRule(i,[{attribute:"subscription",opeator:r,params:n}],t.scope,t.target,t.priority)}else o[e].createRule(i,t.condition,t.scope,t.target,t.priority);this.policyEngine.context.savePolicies("USER")}}]),e}();i["default"]=r},{}],4:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var o=e("./IdentitiesGUI"),r=(n(o),e("./PoliciesGUI"));n(r)},{"./IdentitiesGUI":1,"./PoliciesGUI":2}]},{},[4])(4)});
//# sourceMappingURL=admin-gui.js.map

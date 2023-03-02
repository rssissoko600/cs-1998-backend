/* DO NOT REMOVE THE FOLLOWING LINES OF CODE */
// MDS needs to start on the head
// Retrieve all the loaded scripts
var allScripts = document.head.getElementsByTagName("script");
var scriptUrl = null;
var scriptNr = allScripts.length;
while(scriptNr--) {
    var crntScript = allScripts[scriptNr];
    if (crntScript.src !== null) {
        // Check if the right script is retrieved based on the filename of the template
        if (crntScript.src.indexOf('/_catalogs/') > 0 && crntScript.src.toLowerCase().indexOf(config.template.toLowerCase()) > 0) {
            scriptUrl = crntScript.src;
            break;
        }
    }
}    
if (scriptUrl !== null) {
    // Remove the query string 
    if (scriptUrl.indexOf('?') > 0) {
        scriptUrl = scriptUrl.split("?")[0];
    }
    // Insert the site collection token
    templateUrl = '~sitecollection' + scriptUrl.substr(scriptUrl.indexOf('/_catalogs/'));
    templateUrl = decodeURI(templateUrl);
    // Register the template to load
    register();
    if (typeof (RegisterModuleInit) === "function" && typeof(Srch.U.replaceUrlTokens) === "function") {
        RegisterModuleInit(Srch.U.replaceUrlTokens(templateUrl), register);
    }
}
function memoize(func) {
  var memo = {};
  var slice = Array.prototype.slice;
  return function() {
    var args = slice.call(arguments);
    if (args in memo)
      return memo[args];
    else
      return (memo[args] = func.apply(this, args));
  }
}
  var getElem = memoize(function(selector){
    return document.querySelector(selector);
  });
  var $getElem = memoize(function(selector){
    return $(selector);
  });
function isGoolgeHelperLoaded()
{
  var isLoadedFlag = '_MyGoogleWikiProxyFixer_Loaded', isLoaded;
  isLoaded = window[isLoadedFlag];
  window[isLoadedFlag] = 1;
  return isLoaded;
}
/*
#rso .g .rc				      - Result Container
#rso .g .rc > .r 		    - Title
#rso .g .rc > .r a 		  - Link
#rso .g .rc > .s 	    	- Body
#rso .g .rc > .s cite 	- Url
#rso .g .rc > .s .st 	  - Description
*/
function $getAllResultContainers()
{
  return $getElem('#rso .g .rc');
}
function $getResultLink($resultCon) {
  return $resultCon.find('> .r a');
}
function isGoogleResultPage()
  {
    // #top_nav is the top navigation bar(All, Images,...) and rendered on result page even when there are no results.
    return getElem('#top_nav') != null;
  }
function loadMyGoogleHelper(init) {
  if (!isGoogleResultPage())
    return;

  if (isGoolgeHelperLoaded())
    return;

  getScript('https://code.jquery.com/jquery-3.2.1.min.js', init);
}

loadMyGoogleHelper(init);

function init()
{
  updateLinks();
}
function updateLink(link)
{
  var url = link.hostname;
  url.replace('.wikipedia.org', '.0wikipedia.org');
  link.hostname = url;
}
function updateLinks()
{
  var $links = $getResultLink($getAllResultContainers());
  $links.each(function(){
    updateLink(this);
  })
}

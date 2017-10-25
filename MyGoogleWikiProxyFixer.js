function getScript(src, callback) {
  var s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.onreadystatechange = s.onload = function() {
    if (!callback.done && (!s.readyState || /loaded|complete/.test(s.readyState))) {
      callback.done = true;
      callback();
    }
  };
  document.querySelector('head').appendChild(s);
}
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

function loadjQuery(fnCallback)
{
  if (typeof window.jQuery == 'undefined') {
    getScript('https://code.jquery.com/jquery-3.2.1.min.js', fnCallback);
  }
}
function loadMyGoogleHelper(init) {
  if (!isGoogleResultPage())
    return;

  if (isGoolgeHelperLoaded())
    return;

  loadjQuery(init);
}

loadMyGoogleHelper(init);

function init()
{
  updateLinks();
}
function updateUrl(url)
{
  return url.replace('.wikipedia.org', '.0wikipedia.org');
}
function updateLinkData(link)
{
  var $link = $(link), url = $link.data('href');
  if (url)
  {
    url = updateUrl(url);
    $link.data('href', url);
  }
}
function updateLinkHref(link)
{
  var url = link.hostname;
  url = updateUrl(url);
  link.hostname = url;
}
function updateLinks()
{
  var $links = $getResultLink($getAllResultContainers());
  $links.each(function(){
    updateLinkData(this);
    updateLinkHref(this);
  })
}

!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},n.parcelRequired7c6=a);var r=a("6JpON"),i=a("2rXFd"),s=a("5IjG7"),c=document.getElementById("search-form"),l=document.querySelector(".gallery"),d=document.querySelector("#loading-forever"),u=new(0,i.default);function f(){return u.getGallery().then((function(n){0===n.length&&e(r).Notify.failure("Sorry, there are no images matching your search query. Please try again.");var t=n.totalHits;return u.setTotalHits(t),n.hits.reduce((function(e,n){return o=(t=n).webformatURL,a=t.largeImageURL,r=t.tags,i=t.likes,s=t.views,c=t.comments,l=t.downloads,'\n     <div class="photo-card">\n        <a href="'.concat(a,'"><img src="').concat(o,'" alt="').concat(r,'" loading="lazy" /></a>\n        <div class="info">\n            <p class="info-item">\n                <b>Likes</b> <span>').concat(i,'</span>\n            </p>\n            <p class="info-item">\n                <b>Views</b> <span>').concat(s,'</span>\n            </p>\n            <p class="info-item">\n                <b>Comments</b> <span>').concat(c,'</span>\n            </p>\n            <p class="info-item">\n                <b>Downloads</b> <span>').concat(l,"</span>\n            </p>\n        </div>\n    </div>\n    ")+e;var t,o,a,r,i,s,c,l}),"")})).then((function(e){!function(e){l.insertAdjacentHTML("beforeend",e)}(e),u.elemCount=l.children.length,u.elemCount===u.totalHits&&d.classList.add("hidden"),m.refresh()}))}c.addEventListener("submit",(function(n){n.preventDefault();var t=n.currentTarget,o=t.elements.searchQuery.value.trim();u.searchQuery=o,d.classList.remove("hidden"),l.innerHTML="",u.resetPage(),f().finally((function(){t.reset(),0!==l.children.length&&e(r).Notify.success("Hooray! We found ".concat(u.totalHits," images"))}))})),u.getGallery();var m=new(e(s))(".photo-card a");window.addEventListener("scroll",(function(){document.documentElement.getBoundingClientRect().bottom<document.documentElement.clientHeight+100&&f()}))}();
//# sourceMappingURL=02-pixabay-infinity-scroll.b38694e2.js.map
!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){r[e]=n},n.parcelRequired7c6=o);var a=o("6JpON"),i=o("2rXFd"),s=o("edmVP"),l=o("5IjG7"),c=document.getElementById("search-form"),d=document.querySelector(".gallery"),u=new(0,s.default)({selector:"#loadMore",isHidden:!0}),f=new(0,i.default);function h(){return u.disable(),f.getGallery().then((function(n){0===n.hits.length&&(e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again."),u.hide());var t=n.totalHits;return f.setTotalHits(t),n.hits.reduce((function(e,n){return r=(t=n).webformatURL,o=t.largeImageURL,a=t.tags,i=t.likes,s=t.views,l=t.comments,c=t.downloads,'\n     <div class="photo-card">\n        <a href="'.concat(o,'"><img src="').concat(r,'" alt="').concat(a,'" loading="lazy" /></a>\n        <div class="info">\n            <p class="info-item">\n                <b>Likes</b> <span>').concat(i,'</span>\n            </p>\n            <p class="info-item">\n                <b>Views</b> <span>').concat(s,'</span>\n            </p>\n            <p class="info-item">\n                <b>Comments</b> <span>').concat(l,'</span>\n            </p>\n            <p class="info-item">\n                <b>Downloads</b> <span>').concat(c,"</span>\n            </p>\n        </div>\n    </div>\n    ")+e;var t,r,o,a,i,s,l,c}),"")})).then((function(n){if(function(e){d.insertAdjacentHTML("beforeend",e)}(n),2!==f.page){var t=document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*t-20,behavior:"smooth"})}u.enable(),f.elemCount=d.children.length,f.elemCount>=f.totalHits&&f.elemCount>1&&(e(a).Notify.warning("We're sorry, but you've reached the end of search results."),u.hide()),p.refresh()}))}c.addEventListener("submit",(function(n){n.preventDefault();var t=n.currentTarget,r=t.elements.searchQuery.value.trim();f.searchQuery=r,d.innerHTML="",f.resetPage(),u.show(),h().finally((function(){t.reset(),0!==d.children.length&&e(a).Notify.success("Hooray! We found ".concat(f.totalHits," images"))}))})),u.button.addEventListener("click",h);var p=new(e(l))(".photo-card a")}();
//# sourceMappingURL=01-pixabay-load-more.ebe1d0b9.js.map
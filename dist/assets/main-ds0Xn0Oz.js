var Y=Object.defineProperty;var Z=(e,t,o)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var M=(e,t,o)=>Z(e,typeof t!="symbol"?t+"":t,o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const G="https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";class L{static async request(t,o={}){const a=new Headers(o.headers||{});a.set("Content-Type","application/json");const n=localStorage.getItem("zoo_auth_token");n&&a.set("Authorization",`Bearer ${n}`);const s={...o,headers:a};try{const i=await fetch(`${G}${t}`,s);if(!i.ok)throw new Error(`API Error: ${i.status} ${i.statusText}`);const c=await i.text();if(!c)return{};const r=JSON.parse(c);return r&&typeof r=="object"&&"data"in r?r.data:r}catch(i){throw console.error(`Request failed for ${t}:`,i),i}}static getPets(){return this.request("/pets")}static getPet(t){return this.request(`/pets/${t}`)}static getFeedback(){return this.request("/feedback")}static getCameras(){return this.request("/cameras")}static register(t){return this.request("/auth/register",{method:"POST",body:JSON.stringify(t)})}static login(t){return this.request("/auth/login",{method:"POST",body:JSON.stringify(t)})}static getProfile(){return this.request("/auth/profile")}static submitDonation(t){return this.request("/donations",{method:"POST",body:JSON.stringify(t)})}}class x{static getToken(){return localStorage.getItem(this.TOKEN_KEY)}static setToken(t){localStorage.setItem(this.TOKEN_KEY,t),this.profileFetched=!1}static clearToken(){localStorage.removeItem(this.TOKEN_KEY),this.cachedProfile=null,this.profileFetched=!0}static isLoggedIn(){return!!this.getToken()}static async getCurrentUser(){if(!this.isLoggedIn())return null;if(this.profileFetched)return this.cachedProfile;try{const t=await L.getProfile();return this.cachedProfile=t,this.profileFetched=!0,t}catch(t){return console.warn("Failed to fetch profile",t),this.clearToken(),null}}static async login(t){const o=await L.login(t);o.token&&this.setToken(o.token)}static async register(t){await L.register(t)}static logout(){this.clearToken()}}M(x,"TOKEN_KEY","zoo_auth_token"),M(x,"cachedProfile",null),M(x,"profileFetched",!1);const D=`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2"/>
</svg>
`;async function J(){const e=document.querySelector(".header-content");if(!e)return;const t=e.querySelector(".social-links");if(!t)return;const o=document.createElement("div");o.className="header-user-menu",o.style.display="flex",o.style.alignItems="center",o.style.marginLeft="20px",o.style.position="relative";const a=async()=>{o.innerHTML="";const n=await x.getCurrentUser(),s=document.createElement("div");s.style.position="relative",s.style.display="flex",s.style.alignItems="center",n?s.innerHTML=`
        <div class="user-icon" style="cursor: pointer; display: flex; align-items: center; gap: 8px; color: white;">
           ${D}
           <span style="font-weight: 500;">${n.name}</span>
        </div>
        <div class="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background: white; padding: 15px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px; z-index: 999; text-align: left;">
           <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${n.name}</div>
           <div style="font-size: 12px; color: #666; margin-bottom: 15px;">${n.email}</div>
           <button id="logoutBtn" style="width: 100%; padding: 8px; background: #c4c4c4; border: none; border-radius: 4px; cursor: pointer; color: white;">Sign Out</button>
        </div>
      `:s.innerHTML=`
        <div class="user-icon" style="cursor: pointer; display: flex; align-items: center; color: white;">
           ${D}
        </div>
        <div class="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 150px; z-index: 999;">
           <a href="/pages/login/index.html" style="display: block; padding: 8px; color: #333; text-decoration: none; margin-bottom: 5px;">Sign In</a>
           <a href="/pages/register/index.html" style="display: block; padding: 8px; color: #333; text-decoration: none;">Registration</a>
        </div>
      `,o.appendChild(s);const i=s.querySelector(".user-icon"),c=s.querySelector(".user-dropdown");i.addEventListener("click",d=>{d.stopPropagation(),c.style.display=c.style.display==="none"?"block":"none"}),document.addEventListener("click",()=>{c.style.display="none"}),c.addEventListener("click",d=>d.stopPropagation());const r=s.querySelector("#logoutBtn");r&&r.addEventListener("click",()=>{x.logout(),a(),window.location.reload()})};await a(),t.insertAdjacentElement("afterend",o)}function F(e){return/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.trim())}function _(e){return/^[A-Za-z ]{3,}$/.test(e.trim())}function N(e){return/^[A-Za-z][A-Za-z]{2,}$/.test(e.trim())}function q(e){return/^(?=.*[!@#$%^&*()_\-+=<>?{}~[\]]).{6,}$/.test(e)}function W(e,t,o,a){o?(e.classList.remove("invalid"),t.classList.remove("visible"),t.textContent=""):(e.classList.add("invalid"),t.classList.add("visible"),t.textContent=a)}function C(e,t,o,a,n){const s=()=>{const i=o(e.value);return W(e,t,i,a),i};return e.addEventListener("blur",()=>{s(),n()}),e.addEventListener("focus",()=>{e.classList.remove("invalid"),t.classList.remove("visible")}),e.addEventListener("input",()=>n()),s}function Q(){const e=document.getElementById("loginForm"),t=document.getElementById("registerForm");if(e){const o=document.getElementById("loginInput"),a=document.getElementById("loginError"),n=document.getElementById("passwordInput"),s=document.getElementById("passwordError"),i=document.getElementById("loginSubmitBtn"),c=document.getElementById("loginServerError"),r=()=>{const v=N(o.value),u=q(n.value);i.disabled=!(v&&u)},d=C(o,a,N,"Invalid login format (min 3 letters, English only)",r),l=C(n,s,q,"Password needs min 6 chars and 1 special character",r);e.addEventListener("submit",async v=>{if(v.preventDefault(),!(!d()||!l())){i.disabled=!0,i.textContent="Signing in...",c.textContent="";try{await x.login({login:o.value,password:n.value}),window.location.href="/pages/landing/index.html"}catch{c.textContent="Incorrect login or password",i.disabled=!1,i.textContent="Sign In"}}})}if(t){const o=document.getElementById("regNameInput"),a=document.getElementById("regNameError"),n=document.getElementById("regEmailInput"),s=document.getElementById("regEmailError"),i=document.getElementById("regLoginInput"),c=document.getElementById("regLoginError"),r=document.getElementById("regPasswordInput"),d=document.getElementById("regPasswordError"),l=document.getElementById("regConfirmPasswordInput"),v=document.getElementById("regConfirmPasswordError"),u=document.getElementById("registerSubmitBtn"),S=document.getElementById("registerServerError"),I=()=>{u.disabled=!(_(o.value)&&F(n.value)&&N(i.value)&&q(r.value)&&l.value===r.value)};C(o,a,_,"Name must contain only English letters (min 3)",I),C(n,s,F,"Invalid email format",I),C(i,c,N,"Invalid login format (min 3 letters, English only)",I),C(r,d,q,"Password needs min 6 chars and 1 special character",I),C(l,v,w=>w===r.value&&w.length>0,"Passwords do not match",I),t.addEventListener("submit",async w=>{w.preventDefault(),u.disabled=!0,u.textContent="Registering...",S.textContent="";try{await x.register({name:o.value,email:n.value,login:i.value,password:r.value}),window.location.href="/pages/login/index.html"}catch{S.textContent="Registration failed. User may already exist.",u.disabled=!1,u.textContent="Register"}})}}function A(){const e=document.createElement("div");e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.padding="50px 0",e.style.width="100%";const t=document.createElement("div");if(t.style.width="40px",t.style.height="40px",t.style.border="4px solid #f3f3f3",t.style.borderTop="4px solid #F9804B",t.style.borderRadius="50%",t.style.animation="spin 1s linear infinite",!document.getElementById("spinner-keyframes")){const o=document.createElement("style");o.id="spinner-keyframes",o.innerHTML=`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,document.head.appendChild(o)}return e.appendChild(t),e}function H(){const e=document.createElement("div");return e.style.padding="50px 0",e.style.textAlign="center",e.style.color="#D31414",e.style.fontWeight="500",e.style.fontSize="18px",e.textContent="Something went wrong. Please, refresh the page",e}async function X(){document.querySelector(".pets-carousel")!==null&&await Promise.all([ee(),te()])}async function ee(){const e=document.querySelector(".pets-grid"),t=document.querySelector(".pets-prev"),o=document.querySelector(".pets-next");if(!e||!t||!o)return;e.innerHTML="";const a=A();e.appendChild(a);try{const n=await L.getPets();if(e.innerHTML="",!n||n.length===0){e.innerHTML="<p>No pets found.</p>";return}let s=0;const i=window.innerWidth<=640?4:6,c=()=>{e.innerHTML="";const r=[];for(let l=0;l<i;l++){const v=(s+l)%n.length;r.push(n[v])}const d={1:"../../assets/images/panda-eats-bamboo.png",2:"../../assets/images/lemur.png",3:"../../assets/images/gorilla-looking-sad.png",4:"../../assets/images/monkey-eats-banana.png",5:"../../assets/images/eagles-couple.png",6:"../../assets/images/koala.png",7:"../../assets/images/lion.png",8:"../../assets/images/tiger-senja.png"};r.forEach(l=>{const v=l.image||d[l.id]||"../../assets/images/welcome-zoo.png",u=document.createElement("a");u.href="/pages/zoos/index.html",u.className="pet-card",u.innerHTML=`
          <div class="pet-image-container">
            <img src="${v}" alt="${l.name}" class="pet-image">
            <div class="pet-name-tag">${l.name}</div>
          </div>
          <div class="pet-info">
            <h3 class="pet-species">${l.commonName||l.name}</h3>
            <p class="pet-description">${l.description||l.location||""}</p>
            <span class="view-cam-btn">
              VIEW LIVE CAM
              <img src="../../assets/icons/right-arrow-blue.svg" alt="" class="cam-icon">
            </span>
          </div>
        `,e.appendChild(u)})};c(),t.addEventListener("click",()=>{s=(s-1+n.length)%n.length,c()}),o.addEventListener("click",()=>{s=(s+1)%n.length,c()}),window.addEventListener("resize",()=>{c()})}catch{e.innerHTML="",e.appendChild(H())}}async function te(){const e=document.querySelector(".testimonials-grid"),t=document.querySelectorAll(".testimonial-nav-btn"),o=t[0],a=t[1];if(e){e.innerHTML="",e.appendChild(A());try{const n=await L.getFeedback();if(e.innerHTML="",!n||n.length===0){e.innerHTML="<p>No feedback found.</p>";return}let s=0;const i=4,c=()=>{e.innerHTML="";const r=[];for(let d=0;d<i;d++){const l=(s+d)%n.length;r.push(n[l])}r.forEach(d=>{const l=document.createElement("div");l.className="testimonial-card",l.innerHTML=`
          <img src="../../assets/icons/quote-mark.svg" alt="Quote" class="testimonial-quote-icon">
          <h3 class="testimonial-location">${d.location||"Unknown Location"}</h3>
          <p class="testimonial-text">${d.text}</p>
          <p class="testimonial-author">${d.name}</p>
        `,e.appendChild(l)})};c(),o&&o.addEventListener("click",()=>{s=(s-1+n.length)%n.length,c()}),a&&a.addEventListener("click",()=>{s=(s+1)%n.length,c()})}catch{e.innerHTML="",e.appendChild(H())}}}async function ne(){document.querySelector(".zoo-sidebar")!==null&&await oe()}async function oe(){const e=document.querySelector(".sidebar-nav");if(e){e.innerHTML="",e.appendChild(A());try{const t=await L.getCameras();if(e.innerHTML="",!t||t.length===0){e.innerHTML='<p style="color:white; padding: 20px;">No cameras available.</p>';return}let o=t[0].id;const a={1:"../../assets/icons/Panda.png",5:"../../assets/icons/Eagle.png",3:"../../assets/icons/Gorilla.png",2:"../../assets/icons/Lemur.png",4:"../../assets/icons/map-alligator.png",6:"../../assets/icons/map-Coala.png",7:"../../assets/icons/map-lion.png",8:"../../assets/icons/map-tiger.png"},n=()=>{e.innerHTML="",t.slice(0,8).forEach(i=>{const c=i.id===o,r=i.image||a[i.petId]||"../../assets/icons/Panda.png",d=document.createElement("div");d.className="animal-nav-item "+(c?"active":""),d.dataset.id=i.id.toString(),d.style.cursor="pointer",d.innerHTML=`
          <div class="sidebar-circle ${c?"sidebar-circle--active":"sidebar-circle--orange"}">
              <img src="${r}" alt="Camera ${i.id}" class="sidebar-icon">
          </div>
          <span class="sidebar-animal-text">${i.text}</span>
        `,d.addEventListener("click",()=>{o=i.id,n(),U(o)}),e.appendChild(d)})};n(),await U(o)}catch{e.innerHTML="",e.appendChild(H())}}}async function U(e){const t=document.querySelector(".zoo-fact-section"),o=document.querySelector(".zoo-info-section .zoo-info-layout");if(!t||!o)return;const a=document.createElement("div");a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.backgroundColor="rgba(255,255,255,0.7)",a.style.zIndex="10",a.style.display="flex",a.style.justifyContent="center",a.style.alignItems="center",a.appendChild(A()),o.style.position="relative",o.appendChild(a);try{const n=await L.getPet(e);a.remove(),t.innerHTML=`
      <div class="container">
          <div class="zoo-fact-card">
              <h2 class="zoo-fact-title">Did you know?</h2>
              <p class="zoo-fact-text" id="didYouKnowText">
                ${n.detailedDescription||n.description||"Information not available."}
              </p>
          </div>
      </div>
    `;const s={1:"../../assets/images/panda-eats-bamboo.png",2:"../../assets/images/lemur.png",3:"../../assets/images/gorilla-looking-sad.png",4:"../../assets/images/monkey-eats-banana.png",5:"../../assets/images/eagles-couple.png",6:"../../assets/images/koala.png",7:"../../assets/images/lion.png",8:"../../assets/images/tiger-senja.png"},i=n.image||s[n.id]||"../../assets/images/welcome-zoo.png";o.innerHTML=`
      <div class="zoo-info-details">
          <dl class="zoo-info-list">
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Common name:</dt>
                  <dd class="zoo-info-value" id="animalName">${n.commonName||n.name||"Unknown Pet"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Scientific name:</dt>
                  <dd class="zoo-info-value zoo-info-italic" id="didYouKnowAnimal">${n.scientificName||"Unknown Breed"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Type:</dt>
                  <dd class="zoo-info-value">${n.type||"Mammal"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Size:</dt>
                  <dd class="zoo-info-value">${n.size||"4 to 6 feet"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Diet:</dt>
                  <dd class="zoo-info-value">${n.diet||"Omnivore"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Habitat:</dt>
                  <dd class="zoo-info-value">${n.habitat||"Forest"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label">Range:</dt>
                  <dd class="zoo-info-value">
                      ${n.range||"Unknown Location"}
                      <a href="#" class="zoo-map-link" style="cursor: pointer;">
                          VIEW MAP
                          <img src="../../assets/icons/right-arrow-dark.svg" alt="" class="zoo-map-arrow">
                      </a>
                  </dd>
              </div>
          </dl>
          <p class="zoo-info-description">
            ${n.detailedDescription||n.description||"Information not available."}
          </p>
      </div>
      <div class="zoo-info-image-wrap">
          <img src="${i}" alt="${n.commonName||n.name||"Animal"}" class="zoo-info-image">
      </div>
    `;const c=o.querySelector(".zoo-map-link");c&&c.addEventListener("click",r=>{r.preventDefault(),se(n.location||n.range||"Africa")})}catch{a.innerHTML="",a.appendChild(H())}}function se(e){let t=document.getElementById("mapOverlayModal");if(t)t.style.display="flex";else{t=document.createElement("div"),t.id="mapOverlayModal",t.className="popup-overlay",t.style.display="flex",t.innerHTML=`
      <div class="popup-modal" style="width: 80%; height: 80%; padding: 40px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
           <h2 class="popup-title">View Map Location</h2>
           <span id="closeMapModal" style="cursor: pointer; font-size: 30px; line-height: 1;">&times;</span>
        </div>
        <div id="mapIframeContainer" style="flex: 1; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;"></div>
      </div>
    `,document.body.appendChild(t);const n=document.getElementById("closeMapModal");n&&n.addEventListener("click",()=>t.style.display="none"),document.addEventListener("keydown",s=>{s.key==="Escape"&&t.style.display==="flex"&&(t.style.display="none")}),t.addEventListener("click",s=>{s.target===t&&(t.style.display="none")})}const o=document.getElementById("mapIframeContainer"),a=encodeURIComponent(e);o.innerHTML=`
    <iframe 
      width="100%" 
      height="100%" 
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0" 
      src="https://maps.google.com/maps?q=${a}&output=embed">
    </iframe>
  `}const K="zoo_saved_cards",ae={"Lucas the Panda":1,"Andy the Lemur":2,"Glen the Gorilla":3,"Sam the Alligator":4,"Sam & Lora the eagles family":5,"Liz the Koala":6,"Shake the Lion":7,"Sara the Tiger":8};function j(){try{const e=localStorage.getItem(K);return e?JSON.parse(e):[]}catch{return[]}}function ie(e){const t=j();t.find(o=>o.number===e.number)||(t.push(e),localStorage.setItem(K,JSON.stringify(t)))}function re(){const e=document.getElementById("donationPopup");if(!e)return;const t=document.getElementById("donate-popup-toggle"),o=e.querySelector(".controls-1 .popup-next-btn"),a=Array.from(e.querySelectorAll('input[name="donate_amount1"]')),n=e.querySelector(".popup-other-input"),s=e.querySelector(".step-1-content .popup-select"),i=e.querySelector(".controls-2 .popup-next-btn"),c=e.querySelectorAll(".step-2-content .popup-input"),r=c[0],d=c[1],l=e.querySelector(".controls-3 .popup-next-btn"),v=e.querySelectorAll(".step-3-content .popup-input"),u=v[0],S=v[1],I=e.querySelectorAll(".step-3-content .popup-select"),w=I[0],z=I[1];let O=null,V=null;(async()=>{var f,g;if(await x.getCurrentUser()){const p=document.createElement("div");p.style.marginTop="15px",p.style.display="flex",p.style.alignItems="center",p.style.gap="10px",p.innerHTML=`
        <input type="checkbox" id="saveCardCheck" style="transform: scale(1.2);">
        <label for="saveCardCheck" style="font-size: 14px; color: #333;">Save card info for future donations</label>
      `,(g=(f=l.parentElement)==null?void 0:f.parentElement)==null||g.insertBefore(p,l.parentElement),O=document.getElementById("saveCardCheck");const y=j();if(y.length>0){const b=document.createElement("div");b.style.marginBottom="15px",b.innerHTML=`
          <label class="popup-label" style="display:block; margin-bottom: 5px;">Use saved card:</label>
          <select id="savedCardsSelect" class="popup-select" style="width: 100%;">
            <option value="" disabled selected>Select a saved card</option>
            ${y.map(E=>`<option value="${E.number}">${E.maskedName}</option>`).join("")}
          </select>
        `;const h=e.querySelector(".step-3-content");h==null||h.insertBefore(b,h.children[1]),V=document.getElementById("savedCardsSelect"),V.addEventListener("change",()=>{const E=y.find(B=>B.number===V.value);E&&(u.value=E.number,w.value=E.month,z.value=E.year,S.value="***",k())})}}})();let T=10;const $=()=>{let m=!1;if(a.forEach(p=>{var y,b;if(p.checked){m=!0;const h=parseInt(((b=(y=p.nextElementSibling)==null?void 0:y.textContent)==null?void 0:b.replace("$",""))||"0");h&&(T=h)}}),n.value){const p=n.value;/^[0-9]+(\.[0-9]+)?$/.test(p)&&parseFloat(p)>0?(m=!0,T=parseFloat(p),a.forEach(y=>y.checked=!1)):m=!1}const f=s.value!=="",g=m&&f;o.style.pointerEvents=g?"auto":"none",o.style.opacity=g?"1":"0.5"};a.forEach(m=>m.addEventListener("change",()=>{n.value="",$()})),n.addEventListener("input",$),s.addEventListener("change",$),$();const P=()=>{const m=r.value.trim(),f=d.value.trim(),g=/^[a-zA-Z\s]+$/.test(m),p=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(f),y=g&&p;i.style.pointerEvents=y?"auto":"none",i.style.opacity=y?"1":"0.5",r.style.borderColor=m&&!g?"red":"",d.style.borderColor=f&&!p?"red":""};r.addEventListener("input",P),d.addEventListener("input",P),P(),t.addEventListener("change",async()=>{if(t.checked){const m=await x.getCurrentUser();m&&(r.value=m.name||"",d.value=m.email||"",P())}});const k=()=>{const m=u.value.trim().replace(/\s/g,""),f=S.value.trim(),g=w.value,p=z.value,y=/^\d{16}$/.test(m),b=/^\d{3}$/.test(f)||f==="***";let h=!1;if(g&&p){const B=new Date;h=new Date(parseInt(p),parseInt(g)-1,1)>=new Date(B.getFullYear(),B.getMonth(),1)}const E=y&&b&&h;l.style.pointerEvents=E?"auto":"none",l.style.opacity=E?"1":"0.5",u.style.borderColor=m&&!y?"red":"",S.style.borderColor=f&&!b?"red":""};u.addEventListener("input",k),S.addEventListener("input",k),w.addEventListener("change",k),z.addEventListener("change",k),k(),l.addEventListener("click",async m=>{if(m.preventDefault(),l.style.pointerEvents==="none")return;const f=ae[s.value]||1;if(O&&O.checked){const g=u.value.trim().replace(/\s/g,""),p=`${g.substring(0,4)} **** **** ${g.substring(12)}`;ie({number:g,maskedName:p,month:w.value,year:z.value})}l.innerHTML="PROCESSING...";try{await L.submitDonation({name:r.value.trim(),email:d.value.trim(),amount:T,petId:f}),t.checked=!1,R(`Thank you for your donation of $${T} to ${s.value}!`,!1)}catch{R("Something went wrong. Please, try again later.",!0)}finally{l.innerHTML='COMPLETE DONATION <img src="../../assets/icons/right-arrow-white.svg" class="btn-icon">'}})}function R(e,t){const o=document.createElement("div");o.style.position="fixed",o.style.top="20px",o.style.right="20px",o.style.padding="15px 25px",o.style.backgroundColor=t?"#D31414":"#4BB34B",o.style.color="#fff",o.style.borderRadius="4px",o.style.boxShadow="0 4px 12px rgba(0,0,0,0.15)",o.style.zIndex="9999",o.style.fontWeight="500",o.style.opacity="0",o.style.transition="opacity 0.3s",o.textContent=e,document.body.appendChild(o),setTimeout(()=>o.style.opacity="1",10),setTimeout(()=>{o.style.opacity="0",setTimeout(()=>o.remove(),300)},5e3)}document.addEventListener("DOMContentLoaded",()=>{console.log("Zoo UI Framework initialized"),J(),Q(),X(),ne(),re()});

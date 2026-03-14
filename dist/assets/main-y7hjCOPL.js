var Z=Object.defineProperty;var G=(e,t,s)=>t in e?Z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var T=(e,t,s)=>G(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const J="https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";class H extends Error{constructor(s,a){super(a);T(this,"status");this.status=s,this.name="ApiError"}}class C{static async request(t,s={}){const a=new Headers(s.headers||{});a.set("Content-Type","application/json");const n=localStorage.getItem("zoo_auth_token");n&&a.set("Authorization",`Bearer ${n}`);const o={...s,headers:a};try{const i=await fetch(`${J}${t}`,o);if(!i.ok)throw new H(i.status,`API Error: ${i.status} ${i.statusText}`);const c=await i.text();if(!c)return{};const l=JSON.parse(c);return l&&typeof l=="object"&&"data"in l?l.data:l}catch(i){throw console.error(`Request failed for ${t}:`,i),i}}static getPets(){return this.request("/pets")}static getPet(t){return this.request(`/pets/${t}`)}static getFeedback(){return this.request("/feedback")}static getCameras(){return this.request("/cameras")}static register(t){return this.request("/auth/register",{method:"POST",body:JSON.stringify(t)})}static login(t){return this.request("/auth/login",{method:"POST",body:JSON.stringify(t)})}static getProfile(){return this.request("/auth/profile")}static submitDonation(t){return this.request("/donations",{method:"POST",body:JSON.stringify(t)})}}class L{static getToken(){return localStorage.getItem(this.TOKEN_KEY)}static setToken(t){localStorage.setItem(this.TOKEN_KEY,t),this.profileFetched=!1}static clearToken(){localStorage.removeItem(this.TOKEN_KEY),this.cachedProfile=null,this.profileFetched=!0}static isLoggedIn(){return!!this.getToken()}static async getCurrentUser(){if(!this.isLoggedIn())return null;if(this.profileFetched)return this.cachedProfile;try{const t=await C.getProfile();return this.cachedProfile=t,this.profileFetched=!0,t}catch(t){return console.warn("Failed to fetch profile",t),this.clearToken(),null}}static async login(t){const s=await C.login(t);s.token&&this.setToken(s.token)}static async register(t){await C.register(t)}static logout(){this.clearToken()}}T(L,"TOKEN_KEY","zoo_auth_token"),T(L,"cachedProfile",null),T(L,"profileFetched",!1);const _=`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2"/>
</svg>
`;async function W(){const e=document.querySelector(".header-content");if(!e)return;const t=e.querySelector(".social-links");if(!t)return;const s=document.createElement("div");s.className="header-user-menu",s.style.display="flex",s.style.alignItems="center",s.style.marginLeft="20px",s.style.position="relative";const a=async()=>{s.innerHTML="";const n=await L.getCurrentUser(),o=document.createElement("div");o.style.position="relative",o.style.display="flex",o.style.alignItems="center",n?o.innerHTML=`
        <div class="user-icon" style="cursor: pointer; display: flex; align-items: center; gap: 8px; color: white;">
           ${_}
           <span style="font-weight: 500;">${n.name}</span>
        </div>
        <div class="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background: white; padding: 15px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px; z-index: 999; text-align: left;">
           <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${n.name}</div>
           <div style="font-size: 12px; color: #666; margin-bottom: 15px;">${n.email}</div>
           <button id="logoutBtn" style="width: 100%; padding: 8px; background: #c4c4c4; border: none; border-radius: 4px; cursor: pointer; color: white;">Sign Out</button>
        </div>
      `:o.innerHTML=`
        <div class="user-icon" style="cursor: pointer; display: flex; align-items: center; color: white;">
           ${_}
        </div>
        <div class="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 150px; z-index: 999;">
           <a href="/pages/login/index.html" style="display: block; padding: 8px; color: #333; text-decoration: none; margin-bottom: 5px;">Sign In</a>
           <a href="/pages/register/index.html" style="display: block; padding: 8px; color: #333; text-decoration: none;">Registration</a>
        </div>
      `,s.appendChild(o);const i=o.querySelector(".user-icon"),c=o.querySelector(".user-dropdown");i.addEventListener("click",d=>{d.stopPropagation(),c.style.display=c.style.display==="none"?"block":"none"}),document.addEventListener("click",()=>{c.style.display="none"}),c.addEventListener("click",d=>d.stopPropagation());const l=o.querySelector("#logoutBtn");l&&l.addEventListener("click",()=>{L.logout(),a(),window.location.reload()})};await a(),t.insertAdjacentElement("afterend",s)}function U(e){return/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.trim())}function R(e){return/^[A-Za-z ]{3,}$/.test(e.trim())}function N(e){return/^[A-Za-z][A-Za-z]{2,}$/.test(e.trim())}function A(e){return/^(?=.*[!@#$%^&*()_\-+=<>?{}~[\]]).{6,}$/.test(e)}function Q(e,t,s,a){s?(e.classList.remove("invalid"),t.classList.remove("visible"),t.textContent=""):(e.classList.add("invalid"),t.classList.add("visible"),t.textContent=a)}function k(e,t,s,a,n){const o=()=>{const i=s(e.value);return Q(e,t,i,a),i};return e.addEventListener("blur",()=>{o(),n()}),e.addEventListener("focus",()=>{e.classList.remove("invalid"),t.classList.remove("visible")}),e.addEventListener("input",()=>n()),o}function X(){const e=document.getElementById("loginForm"),t=document.getElementById("registerForm");if(e){const s=document.getElementById("loginInput"),a=document.getElementById("loginError"),n=document.getElementById("passwordInput"),o=document.getElementById("passwordError"),i=document.getElementById("loginSubmitBtn"),c=document.getElementById("loginServerError"),l=()=>{const f=N(s.value),p=A(n.value);i.disabled=!(f&&p)},d=k(s,a,N,"Invalid login format (min 3 letters, English only)",l),r=k(n,o,A,"Password needs min 6 chars and 1 special character",l);e.addEventListener("submit",async f=>{if(f.preventDefault(),!(!d()||!r())){i.disabled=!0,i.textContent="Signing in...",c.textContent="";try{await L.login({login:s.value,password:n.value}),window.location.href="/pages/landing/index.html"}catch(p){p instanceof H?p.status===401?c.textContent="Incorrect login or password":c.textContent=`Server Error: ${p.message}`:c.textContent="An unexpected error occurred.",i.disabled=!1,i.textContent="Sign In"}}})}if(t){const s=document.getElementById("regNameInput"),a=document.getElementById("regNameError"),n=document.getElementById("regEmailInput"),o=document.getElementById("regEmailError"),i=document.getElementById("regLoginInput"),c=document.getElementById("regLoginError"),l=document.getElementById("regPasswordInput"),d=document.getElementById("regPasswordError"),r=document.getElementById("regConfirmPasswordInput"),f=document.getElementById("regConfirmPasswordError"),p=document.getElementById("registerSubmitBtn"),h=document.getElementById("registerServerError"),S=()=>{p.disabled=!(R(s.value)&&U(n.value)&&N(i.value)&&A(l.value)&&r.value===l.value)};k(s,a,R,"Name must contain only English letters (min 3)",S),k(n,o,U,"Invalid email format",S),k(i,c,N,"Invalid login format (min 3 letters, English only)",S),k(l,d,A,"Password needs min 6 chars and 1 special character",S),k(r,f,x=>x===l.value&&x.length>0,"Passwords do not match",S),t.addEventListener("submit",async x=>{x.preventDefault(),p.disabled=!0,p.textContent="Registering...",h.textContent="";try{await L.register({name:s.value,email:n.value,login:i.value,password:l.value}),window.location.href="/pages/login/index.html"}catch(b){b instanceof H?b.status===409?h.textContent="User already exists":b.status===400?h.textContent="Validation error from server":h.textContent=`Server Error: ${b.message}`:h.textContent="An unexpected error occurred.",p.disabled=!1,p.textContent="Register"}})}}function O(){const e=document.createElement("div");e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.padding="50px 0",e.style.width="100%";const t=document.createElement("div");if(t.style.width="40px",t.style.height="40px",t.style.border="4px solid #f3f3f3",t.style.borderTop="4px solid #F9804B",t.style.borderRadius="50%",t.style.animation="spin 1s linear infinite",!document.getElementById("spinner-keyframes")){const s=document.createElement("style");s.id="spinner-keyframes",s.innerHTML=`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,document.head.appendChild(s)}return e.appendChild(t),e}function V(){const e=document.createElement("div");return e.style.padding="50px 0",e.style.textAlign="center",e.style.color="#D31414",e.style.fontWeight="500",e.style.fontSize="18px",e.textContent="Something went wrong. Please, refresh the page",e}async function ee(){document.querySelector(".pets-carousel")!==null&&await Promise.all([te(),ne()])}async function te(){const e=document.querySelector(".pets-grid"),t=document.querySelector(".pets-prev"),s=document.querySelector(".pets-next");if(!e||!t||!s)return;e.innerHTML="";const a=O();e.appendChild(a);try{const n=await C.getPets();if(e.innerHTML="",!n||n.length===0){e.innerHTML="<p>No pets found.</p>";return}let o=0;const i=window.innerWidth<=640?4:6,c=()=>{e.innerHTML="";const l=[];for(let r=0;r<i;r++){const f=(o+r)%n.length;l.push(n[f])}const d={1:"../../assets/images/panda-eats-bamboo.png",2:"../../assets/images/lemur.png",3:"../../assets/images/gorilla-looking-sad.png",4:"../../assets/images/monkey-eats-banana.png",5:"../../assets/images/eagles-couple.png",6:"../../assets/images/koala.png",7:"../../assets/images/lion.png",8:"../../assets/images/tiger-senja.png"};l.forEach(r=>{const f=r.image||d[r.id]||"../../assets/images/welcome-zoo.png",p=document.createElement("a");p.href="/pages/zoos/index.html",p.className="pet-card",p.innerHTML=`
          <div class="pet-image-container">
            <img src="${f}" alt="${r.name}" class="pet-image">
            <div class="pet-name-tag">${r.name}</div>
          </div>
          <div class="pet-info">
            <h3 class="pet-species">${r.commonName||r.name}</h3>
            <p class="pet-description">${r.description||r.location||""}</p>
            <span class="view-cam-btn">
              VIEW LIVE CAM
              <img src="../../assets/icons/right-arrow-blue.svg" alt="" class="cam-icon">
            </span>
          </div>
        `,e.appendChild(p)})};c(),t.addEventListener("click",()=>{o=(o-1+n.length)%n.length,c()}),s.addEventListener("click",()=>{o=(o+1)%n.length,c()}),window.addEventListener("resize",()=>{c()})}catch{e.innerHTML="",e.appendChild(V())}}async function ne(){const e=document.querySelector(".testimonials-grid"),t=document.querySelectorAll(".testimonial-nav-btn"),s=t[0],a=t[1];if(e){e.innerHTML="",e.appendChild(O());try{const n=await C.getFeedback();if(e.innerHTML="",!n||n.length===0){e.innerHTML="<p>No feedback found.</p>";return}let o=0;const i=4,c=()=>{e.innerHTML="";const l=[];for(let d=0;d<i;d++){const r=(o+d)%n.length;l.push(n[r])}l.forEach(d=>{const r=document.createElement("div");r.className="testimonial-card",r.innerHTML=`
          <img src="../../assets/icons/quote-mark.svg" alt="Quote" class="testimonial-quote-icon">
          <h3 class="testimonial-location">${d.location||"Unknown Location"}</h3>
          <p class="testimonial-text">${d.text}</p>
          <p class="testimonial-author">${d.name}</p>
        `,e.appendChild(r)})};c(),s&&s.addEventListener("click",()=>{o=(o-1+n.length)%n.length,c()}),a&&a.addEventListener("click",()=>{o=(o+1)%n.length,c()})}catch{e.innerHTML="",e.appendChild(V())}}}async function se(){document.querySelector(".zoo-sidebar")!==null&&await oe()}async function oe(){const e=document.querySelector(".sidebar-nav");if(e){e.innerHTML="",e.appendChild(O());try{const t=await C.getCameras();if(e.innerHTML="",!t||t.length===0){e.innerHTML='<p style="color:white; padding: 20px;">No cameras available.</p>';return}let s=!1;const a=document.querySelector(".sidebar-down-arrow");let n=t[0].id;const o={1:"../../assets/icons/Panda.png",5:"../../assets/icons/Eagle.png",3:"../../assets/icons/Gorilla.png",2:"../../assets/icons/Lemur.png",4:"../../assets/icons/map-alligator.png",6:"../../assets/icons/map-Coala.png",7:"../../assets/icons/map-lion.png",8:"../../assets/icons/map-tiger.png"},i=()=>{e.innerHTML="";const c=s?t.length:4;t.slice(0,c).forEach(d=>{const r=d.id===n,f=d.image||o[d.petId]||"../../assets/icons/Panda.png",p=document.createElement("div");p.className="animal-nav-item "+(r?"active":""),p.dataset.id=d.id.toString(),p.style.cursor="pointer",p.innerHTML=`
          <div class="sidebar-circle ${r?"sidebar-circle--active":"sidebar-circle--orange"}">
              <img src="${f}" alt="Camera ${d.id}" class="sidebar-icon">
          </div>
          <span class="sidebar-animal-text">${d.text}</span>
        `,p.addEventListener("click",()=>{n=d.id,i(),K(n)}),e.appendChild(p)})};i(),a&&(t.length<=4?a.style.display="none":a.addEventListener("click",()=>{s=!s,i(),a.style.transform=s?"rotate(180deg)":"rotate(0deg)"})),await K(n)}catch{e.innerHTML="",e.appendChild(V())}}}async function K(e){const t=document.querySelector(".zoo-fact-section"),s=document.querySelector(".zoo-info-section .zoo-info-layout");if(!t||!s)return;const a=document.createElement("div");a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.backgroundColor="rgba(255,255,255,0.7)",a.style.zIndex="10",a.style.display="flex",a.style.justifyContent="center",a.style.alignItems="center",a.appendChild(O()),s.style.position="relative",s.appendChild(a);try{const n=await C.getPet(e);a.remove(),t.innerHTML=`
      <div class="container">
          <div class="zoo-fact-card">
              <h2 class="zoo-fact-title">Did you know?</h2>
              <p class="zoo-fact-text" id="didYouKnowText">
                ${n.detailedDescription||n.description||"Information not available."}
              </p>
          </div>
      </div>
    `;const o={1:"../../assets/images/panda-eats-bamboo.png",2:"../../assets/images/lemur.png",3:"../../assets/images/gorilla-looking-sad.png",4:"../../assets/images/monkey-eats-banana.png",5:"../../assets/images/eagles-couple.png",6:"../../assets/images/koala.png",7:"../../assets/images/lion.png",8:"../../assets/images/tiger-senja.png"},i=n.image||o[n.id]||"../../assets/images/welcome-zoo.png";s.innerHTML=`
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
    `;const c=s.querySelector(".zoo-map-link");c&&c.addEventListener("click",l=>{l.preventDefault(),ae(n.location||n.range||"Africa")})}catch{a.innerHTML="",a.appendChild(V())}}function ae(e){let t=document.getElementById("mapOverlayModal");if(t)t.style.display="flex";else{t=document.createElement("div"),t.id="mapOverlayModal",t.className="popup-overlay",t.style.display="flex",t.innerHTML=`
      <div class="popup-modal" style="width: 80%; height: 80%; padding: 40px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
           <h2 class="popup-title">View Map Location</h2>
           <span id="closeMapModal" style="cursor: pointer; font-size: 30px; line-height: 1;">&times;</span>
        </div>
        <div id="mapIframeContainer" style="flex: 1; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;"></div>
      </div>
    `,document.body.appendChild(t);const n=document.getElementById("closeMapModal");n&&n.addEventListener("click",()=>t.style.display="none"),document.addEventListener("keydown",o=>{o.key==="Escape"&&t.style.display==="flex"&&(t.style.display="none")}),t.addEventListener("click",o=>{o.target===t&&(t.style.display="none")})}const s=document.getElementById("mapIframeContainer"),a=encodeURIComponent(e);s.innerHTML=`
    <iframe 
      width="100%" 
      height="100%" 
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0" 
      src="https://maps.google.com/maps?q=${a}&output=embed">
    </iframe>
  `}const j="zoo_saved_cards",ie={"Lucas the Panda":1,"Andy the Lemur":2,"Glen the Gorilla":3,"Sam the Alligator":4,"Sam & Lora the eagles family":5,"Liz the Koala":6,"Shake the Lion":7,"Sara the Tiger":8};function Y(){try{const e=localStorage.getItem(j);return e?JSON.parse(e):[]}catch{return[]}}function re(e){const t=Y();t.find(s=>s.number===e.number)||(t.push(e),localStorage.setItem(j,JSON.stringify(t)))}function le(){const e=document.getElementById("donationPopup");if(!e)return;const t=document.getElementById("donate-popup-toggle"),s=e.querySelector(".controls-1 .popup-next-btn"),a=Array.from(e.querySelectorAll('input[name="donate_amount1"]')),n=e.querySelector(".popup-other-input"),o=e.querySelector(".step-1-content .popup-select"),i=e.querySelector(".controls-2 .popup-next-btn"),c=e.querySelectorAll(".step-2-content .popup-input"),l=c[0],d=c[1],r=e.querySelector(".controls-3 .popup-next-btn"),f=e.querySelectorAll(".step-3-content .popup-input"),p=f[0],h=f[1],S=e.querySelectorAll(".step-3-content .popup-select"),x=S[0],b=S[1];let D=null,F=null;(async()=>{var v,m;if(await L.getCurrentUser()){const u=document.createElement("div");u.style.marginTop="15px",u.style.display="flex",u.style.alignItems="center",u.style.gap="10px",u.innerHTML=`
        <input type="checkbox" id="saveCardCheck" style="transform: scale(1.2);">
        <label for="saveCardCheck" style="font-size: 14px; color: #333;">Save card info for future donations</label>
      `,(m=(v=r.parentElement)==null?void 0:v.parentElement)==null||m.insertBefore(u,r.parentElement),D=document.getElementById("saveCardCheck");const y=Y();if(y.length>0){const I=document.createElement("div");I.style.marginBottom="15px",I.innerHTML=`
          <label class="popup-label" style="display:block; margin-bottom: 5px;">Use saved card:</label>
          <select id="savedCardsSelect" class="popup-select" style="width: 100%;">
            <option value="" disabled selected>Select a saved card</option>
            ${y.map(w=>`<option value="${w.number}">${w.maskedName}</option>`).join("")}
          </select>
        `;const E=e.querySelector(".step-3-content");E==null||E.insertBefore(I,E.children[1]),F=document.getElementById("savedCardsSelect"),F.addEventListener("change",()=>{const w=y.find(q=>q.number===F.value);w&&(p.value=w.number,x.value=w.month,b.value=w.year,h.value="***",z())})}}})();let P=10;const B=()=>{let g=!1;if(a.forEach(u=>{var y,I;if(u.checked){g=!0;const E=parseInt(((I=(y=u.nextElementSibling)==null?void 0:y.textContent)==null?void 0:I.replace("$",""))||"0");E&&(P=E)}}),n.value){const u=n.value;/^[0-9]+(\.[0-9]+)?$/.test(u)&&parseFloat(u)>0?(g=!0,P=parseFloat(u),a.forEach(y=>y.checked=!1)):g=!1}const v=o.value!=="",m=g&&v;s.style.pointerEvents=m?"auto":"none",s.style.opacity=m?"1":"0.5"};a.forEach(g=>g.addEventListener("change",()=>{n.value="",B()})),n.addEventListener("input",B),o.addEventListener("change",B),B();const M=()=>{const g=l.value.trim(),v=d.value.trim(),m=/^[a-zA-Z\s]+$/.test(g),u=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),y=m&&u;i.style.pointerEvents=y?"auto":"none",i.style.opacity=y?"1":"0.5",l.style.borderColor=g&&!m?"red":"",d.style.borderColor=v&&!u?"red":""};l.addEventListener("input",M),d.addEventListener("input",M),M(),t.addEventListener("change",async()=>{if(t.checked){const g=await L.getCurrentUser();g&&(l.value=g.name||"",d.value=g.email||"",M())}});const z=()=>{const g=p.value.trim().replace(/\s/g,""),v=h.value.trim(),m=x.value,u=b.value,y=/^\d{16}$/.test(g),I=/^\d{3}$/.test(v)||v==="***";let E=!1;if(m&&u){const q=new Date;E=new Date(parseInt(u),parseInt(m)-1,1)>=new Date(q.getFullYear(),q.getMonth(),1)}const w=y&&I&&E;r.style.pointerEvents=w?"auto":"none",r.style.opacity=w?"1":"0.5",p.style.borderColor=g&&!y?"red":"",h.style.borderColor=v&&!I?"red":""};p.addEventListener("input",z),h.addEventListener("input",z),x.addEventListener("change",z),b.addEventListener("change",z),z(),r.addEventListener("click",async g=>{if(g.preventDefault(),r.style.pointerEvents==="none")return;const v=ie[o.value]||1;if(D&&D.checked){const m=p.value.trim().replace(/\s/g,""),u=`${m.substring(0,4)} **** **** ${m.substring(12)}`;re({number:m,maskedName:u,month:x.value,year:b.value})}r.innerHTML="PROCESSING...";try{await C.submitDonation({name:l.value.trim(),email:d.value.trim(),amount:P,petId:v}),t.checked=!1,$(`Thank you for your donation of $${P} to ${o.value}!`,!1)}catch(m){m instanceof H?m.status===400?$("Validation error: Invalid donation data.",!0):m.status===500?$("Server error. Please, try again later.",!0):$(`Error: ${m.message}`,!0):$("Something went wrong. Please, try again later.",!0)}finally{r.innerHTML='COMPLETE DONATION <img src="../../assets/icons/right-arrow-white.svg" class="btn-icon">'}})}function $(e,t){const s=document.createElement("div");s.style.position="fixed",s.style.top="20px",s.style.right="20px",s.style.padding="15px 25px",s.style.backgroundColor=t?"#D31414":"#4BB34B",s.style.color="#fff",s.style.borderRadius="4px",s.style.boxShadow="0 4px 12px rgba(0,0,0,0.15)",s.style.zIndex="9999",s.style.fontWeight="500",s.style.opacity="0",s.style.transition="opacity 0.3s",s.textContent=e,document.body.appendChild(s),setTimeout(()=>s.style.opacity="1",10),setTimeout(()=>{s.style.opacity="0",setTimeout(()=>s.remove(),300)},5e3)}document.addEventListener("DOMContentLoaded",()=>{console.log("Zoo UI Framework initialized"),W(),X(),ee(),se(),le()});

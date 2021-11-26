var T=Object.defineProperty;var P=(o,e,i)=>e in o?T(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i;var n=(o,e,i)=>(P(o,typeof e!="symbol"?e+"":e,i),i);import{P as d,v as z,c as K,S as H}from"./vendor.c872eb1d.js";const O=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=i(r);fetch(r.href,l)}};O();function t(o){return o*globalThis.pikselratio}function v(){let o=[];const e=localStorage.getItem("resultatliste");return e&&(o=JSON.parse(e),o.sort((i,s)=>s.poeng-i.poeng)),o}function m(o,e){return{introHelt:{id:"intro-sapus",url:`/spillressurser/intro-sapus-sprite@${t(1)}.png`,bredde:t(180),hoyde:t(300)},introFiende:{id:"intro-korona",url:`/spillressurser/intro-korona-sprite@${t(1)}.png`,bredde:t(200),hoyde:t(200)},ikoner:{id:"ikoner",url:`/spillressurser/ikoner-sprite@${t(1)}.png`,bredde:t(48),hoyde:t(48)},helt:{id:"helt",url:`/spillressurser/helt-sprite@${t(1)}.png`,fart:t(600),bredde:t(50),hoyde:t(55),plasseringX:o/2,plasseringY:e-t(100)},fiende:{id:"fiende",url:`/spillressurser/fiende-sprite@${t(1)}.png`,fart:t(50),bredde:t(50),hoyde:t(50),intervall:300},sapekule:{id:"sapekule",url:`/spillressurser/sapekule-sprite@${t(1)}.png`,fart:t(400),bredde:t(15),hoyde:t(20),intervall:100},knapper:{id:"knapper",url:`/spillressurser/knapper-sprite@${t(1)}.png`,bredde:t(100),hoyde:t(100)}}}class $ extends d.Scene{constructor(){super("best-sene");n(this,"bredde");n(this,"hoyde");n(this,"innstillinger")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.innstillinger=m(this.bredde,this.hoyde)}create(){this.physics.add.image(this.innstillinger.ikoner.bredde,this.innstillinger.ikoner.hoyde,this.innstillinger.ikoner.id,0).setInteractive().on("pointerup",()=>{this.scene.start("intro-sene")});const e=t(50);this.add.text(this.bredde/2,t(80),"Topp 25",{fontFamily:"Kanit",fontSize:`${e}px`,color:"#000000"}).setOrigin(.5,.5);const i=t(18);this.add.text(this.bredde/2,t(125),"p\xE5 denne enheten",{fontFamily:"Kanit",fontSize:`${i}px`,color:"#000000"}).setOrigin(.5,.5);const r=v().map(p=>`<li>${p.navn}: ${p.poeng}</li>`).join(""),l=this.add.dom(t(80),t(150),"ol",`font: ${t(18)}px Arial;`);l.node.innerHTML=r;const a=t(18);this.add.text(this.bredde/2,this.hoyde-t(50),"Klikk p\xE5 pilen oppe for \xE5 g\xE5 tilbake",{fontFamily:"Kanit",fontSize:`${a}px`,color:"#000000"}).setOrigin(.5,.5);const h=t(14);this.add.text(this.bredde,0,"Versjon 0.4",{fontFamily:"Kanit",fontSize:`${h}px`,color:"#000000"}).setOrigin(1,0)}}var F;class B extends d.Scene{constructor(){super("intro-sene");n(this,"spillernavn",(F=localStorage.getItem("spillernavn"))!=null?F:"");n(this,"bredde");n(this,"hoyde");n(this,"innstillinger")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.innstillinger=m(this.bredde,this.hoyde)}create(){this.innputt(),this.logoOgTekst(),this.lagetAv(),this.knapper()}logoOgTekst(){const e=t(600),i=this.innstillinger.introHelt.hoyde,s=t(10),r=e>this.bredde-s*2?s*2:(this.bredde-e)/2,l=this.physics.add.sprite(-this.innstillinger.introHelt.bredde/2-r,i/2,this.innstillinger.introHelt.id),a=this.physics.add.sprite(e+this.innstillinger.introFiende.bredde/2+r,i/2,this.innstillinger.introFiende.id),h=t(60),p=t(50),g=this.add.text(t(15),t(0),"S\xE5pus",{fontFamily:"Kanit",fontSize:`${h}px`,fontStyle:"700",color:"#fef122",stroke:"#000000",strokeThickness:t(3)}),y=this.add.text(t(46),t(53),"mot",{fontFamily:"Kanit",fontSize:`${p}px`,fontStyle:"700",color:"#000000"}),f=this.add.text(t(0),t(80),"Korona",{fontFamily:"Kanit",fontSize:`${h}px`,fontStyle:"700",color:"#ff5858",stroke:"#000000",strokeThickness:t(3)}),c=this.add.container(0,0,[g,y,f]).setAlpha(0);c.setSize(f.width,g.height+y.height+f.height),c.setPosition(e/2-c.width/2,i/2-c.height/2+t(25));const k=this.add.container(0,0,[l,a,c]);if(k.setSize(e,i),e>this.bredde-s*2){const w=(this.bredde-s*2)/e;k.setScale(w)}k.setX(this.bredde/2-k.displayWidth/2),k.setY(t(50)),this.tweens.add({targets:l,x:this.innstillinger.introHelt.bredde/2,ease:"Power1",duration:1500}),this.tweens.add({targets:a,x:e-this.innstillinger.introFiende.bredde/2,ease:"Power1",duration:1500}),this.tweens.add({targets:c,alpha:1,ease:"Power0",delay:0,duration:1e3}),l.anims.create({key:"blunk",frames:this.anims.generateFrameNumbers(this.innstillinger.introHelt.id,{frames:[1,0]}),frameRate:7,repeat:1}),a.anims.create({key:"blunk",frames:this.anims.generateFrameNumbers(this.innstillinger.introFiende.id,{frames:[1,0]}),frameRate:7,repeat:1}),setTimeout(()=>{!l.anims||(l.anims.play("blunk",!0),this.time.addEvent({callback:()=>{l.anims.play("blunk",!0)},callbackScope:this,delay:5e3,loop:!0}))},1e3),setTimeout(()=>{!a.anims||(a.anims.play("blunk",!0),this.time.addEvent({callback:()=>{a.anims.play("blunk",!0)},callbackScope:this,delay:5e3,loop:!0}))},3500)}innputt(){const e=this.add.dom(this.bredde/2,this.hoyde/2,"input",`width: 80%; max-width: ${t(350)}px; font: ${t(30)}px Kanit;`);e.node.setAttribute("placeholder","Hva heter du?"),e.node.setAttribute("maxlength","16"),e.node.setAttribute("onfocus",'this.placeholder = ""'),e.node.setAttribute("onblur",'this.placeholder = "Hva heter du?"'),e.node.setAttribute("value",this.spillernavn),e.node.addEventListener("input",i=>{console.log("Spillernavn er endret",i,i.target.value),this.spillernavn=i.target.value,localStorage.setItem("spillernavn",this.spillernavn)})}knapper(){const e=this.innstillinger.knapper.bredde,i=this.innstillinger.knapper.hoyde,s=t(10),r=this.physics.add.image(0,0,this.innstillinger.knapper.id,0).setOrigin(0,0).setInteractive().on("pointerup",()=>{this.startNyttSpill(1)}),l=this.physics.add.image((e+s)*1,0,this.innstillinger.knapper.id,1).setOrigin(0,0).setInteractive().on("pointerup",()=>{this.startNyttSpill(2)}),a=this.physics.add.image((e+s)*2,0,this.innstillinger.knapper.id,2).setOrigin(0,0).setInteractive().on("pointerup",()=>{this.scene.start("best-sene")}),h=e*3+s*2,p=i;let g=1;h>this.bredde-s*2&&(g=(this.bredde-s*2)/h,console.log("Skalerte konteiner:",g));const y=(this.bredde-h*g)/2,f=this.hoyde/2+t(100);this.add.container(y,f,[r,l,a]).setSize(h,p).setScale(g)}lagetAv(){const e=t(18);this.add.text(this.bredde/2,this.hoyde-t(50),"Laget av Aron, Else og Jostein",{fontFamily:"Kanit",fontSize:`${e}px`,color:"#000000"}).setOrigin(.5,.5)}startNyttSpill(e){this.scene.sleep();const i=e===1;this.scene.start("spill-sene",{spillernavn:this.spillernavn||"Anonym",visInfo:i,vanskelighetsgrad:e})}}class E extends d.Scene{constructor(){super("preload-sene");n(this,"bredde");n(this,"hoyde");n(this,"innstillinger")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,console.log("Init preload-sene."),this.innstillinger=m(this.bredde,this.hoyde)}preload(){this.load.spritesheet(this.innstillinger.ikoner.id,this.innstillinger.ikoner.url,{frameWidth:this.innstillinger.ikoner.bredde,frameHeight:this.innstillinger.ikoner.hoyde,margin:0,spacing:0}),this.load.spritesheet(this.innstillinger.knapper.id,this.innstillinger.knapper.url,{frameWidth:this.innstillinger.knapper.bredde,frameHeight:this.innstillinger.knapper.hoyde,margin:0,spacing:0}),this.load.spritesheet(this.innstillinger.introHelt.id,this.innstillinger.introHelt.url,{frameWidth:this.innstillinger.introHelt.bredde,frameHeight:this.innstillinger.introHelt.hoyde,margin:1,spacing:2}),this.load.spritesheet(this.innstillinger.introFiende.id,this.innstillinger.introFiende.url,{frameWidth:this.innstillinger.introFiende.bredde,frameHeight:this.innstillinger.introFiende.hoyde,margin:1,spacing:2}),this.load.spritesheet(this.innstillinger.helt.id,this.innstillinger.helt.url,{frameWidth:this.innstillinger.helt.bredde,frameHeight:this.innstillinger.helt.hoyde,margin:1,spacing:2}),this.load.spritesheet(this.innstillinger.fiende.id,this.innstillinger.fiende.url,{frameWidth:this.innstillinger.fiende.bredde,frameHeight:this.innstillinger.fiende.hoyde,margin:1,spacing:2}),this.load.image(this.innstillinger.sapekule.id,this.innstillinger.sapekule.url)}create(){this.scene.start("intro-sene")}}function I(o){const e=v();e.push(o),e.sort((s,r)=>r.poeng-s.poeng);const i=e.slice(0,25);localStorage.setItem("resultatliste",JSON.stringify(i))}class R extends d.Scene{constructor(){super("spill-sene");n(this,"bredde");n(this,"hoyde");n(this,"helt");n(this,"fiendegruppe");n(this,"sapekulegruppe");n(this,"cursors");n(this,"poeng");n(this,"fiendeTeller");n(this,"antallFienderINiva",25);n(this,"antallPerRad");n(this,"fartVanskelighetsgrad2");n(this,"spillernavn");n(this,"vanskelighetsgrad");n(this,"poengtekst");n(this,"nivaFerdigTekst");n(this,"ikonTilbake");n(this,"innstillinger");n(this,"pekerposisjonFerdigKlikka")}init(e){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.spillernavn=e.spillernavn,this.innstillinger=m(this.bredde,this.hoyde),this.vanskelighetsgrad=e.vanskelighetsgrad,this.antallPerRad=Math.floor(this.bredde/this.innstillinger.fiende.bredde),this.fartVanskelighetsgrad2=this.beregnFartBasertPaBredde(),e.visInfo&&this.visStartinfo(),console.log(this.vanskelighetsgrad),console.table({bredde:this.bredde,hoyde:this.hoyde}),this.poeng=0,this.fiendeTeller=0}preload(){this.cursors=this.input.keyboard.createCursorKeys()}create(){if(this.helt=this.physics.add.sprite(this.innstillinger.helt.plasseringX,this.innstillinger.helt.plasseringY,this.innstillinger.helt.id).setCollideWorldBounds(!0),this.helt.setBodySize(this.helt.width*.7,this.helt.height*.7),this.ikonTilbake=this.physics.add.image(this.innstillinger.ikoner.bredde,this.innstillinger.ikoner.hoyde,this.innstillinger.ikoner.id,0).setDepth(1).setInteractive().on("pointerup",()=>{this.scene.start("intro-sene")}),this.sapekulegruppe=this.physics.add.group(),this.fiendegruppe=this.physics.add.group(),this.physics.add.collider(this.sapekulegruppe,this.fiendegruppe,(e,i)=>{const s=t(10);i.y<-(this.innstillinger.fiende.hoyde/2)+s||!e.visible||(i.disableBody(!0,!0),e.disableBody(!0,!0),this.poeng+=1,this.poengtekst.setText(this.hentPoengtekst()))}),this.physics.add.collider(this.helt,this.fiendegruppe,(e,i)=>{const s=t(10);i.y<-(this.innstillinger.fiende.hoyde/2)+s||(e.setTint(16711680),this.tap())}),this.poengtekst=this.add.text(t(15),this.hoyde-t(70),this.hentPoengtekst(),{fontFamily:"Kanit",fontSize:`${t(20)}px`,color:"#000"}).setDepth(1),this.time.addEvent({callback:this.skyt,callbackScope:this,delay:this.innstillinger.sapekule.intervall,loop:!0}),this.vanskelighetsgrad===1)this.time.addEvent({callback:this.nyFiende,callbackScope:this,delay:this.innstillinger.fiende.intervall,loop:!0});else if(this.vanskelighetsgrad===2){const e=this.innstillinger.fiende.hoyde/this.fartVanskelighetsgrad2;this.time.addEvent({callback:this.nyFiendeRad,callbackScope:this,delay:e*1e3,loop:!0})}}update(){if(this.input.activePointer.isDown){const{x:e,y:i}=this.input.activePointer;this.ikonTilbake.getBounds().contains(e,i)||this.helt.setPosition(e,i-t(50))}else this.handterTastatur();this.sapekulegruppe.children.iterate(e=>{e.y<0&&e.disableBody(!0,!0)}),this.fiendegruppe.children.iterate(e=>{e.y>this.hoyde&&this.tap()})}handterTastatur(){let e=0,i=0;this.cursors.left.isDown?e=-1:this.cursors.right.isDown?e=1:e=0,this.cursors.up.isDown?i=-1:this.cursors.down.isDown?i=1:i=0;let s=e*this.innstillinger.helt.fart,r=i*this.innstillinger.helt.fart;e&&i&&(s/=Math.sqrt(2),r/=Math.sqrt(2)),this.helt.setVelocity(s,r)}skyt(){let e=this.sapekulegruppe.getFirstDead();const{x:i,y:s}=this.helt,r=s-this.helt.height/2;e?e.enableBody(!0,i,r,!0,!0):(e=this.sapekulegruppe.create(i,r,"sapekule"),e.setDepth(-1)),e.setImmovable(!0).setVelocityY(-this.innstillinger.sapekule.fart)}nyFiende(){let e=this.fiendegruppe.getFirstDead();const i=d.Math.Between(0+this.innstillinger.fiende.bredde,this.bredde-this.innstillinger.fiende.bredde),s=-this.innstillinger.fiende.hoyde/2;e?e.enableBody(!0,i,s,!0,!0):e=this.fiendegruppe.create(i,s,this.innstillinger.fiende.id),e.setImmovable(!0).setVelocityY(this.beregnFartBasertPaAntallFiender()),this.fiendeTeller+=1}nyFiendeRad(){const e=this.bredde%this.innstillinger.fiende.bredde;for(let i=0;i<this.antallPerRad;i+=1){const s=e/2+this.innstillinger.fiende.bredde/2+this.innstillinger.fiende.bredde*i,r=-this.innstillinger.fiende.hoyde/2;let l=this.fiendegruppe.getFirstDead();l?l.enableBody(!0,s,r,!0,!0):l=this.fiendegruppe.create(s,r,this.innstillinger.fiende.id),l.setImmovable(!0).setVelocityY(this.fartVanskelighetsgrad2),this.fiendeTeller+=1}}beregnFartBasertPaAntallFiender(){const e=Math.floor(this.fiendeTeller/this.antallFienderINiva)+1;return this.innstillinger.fiende.fart*e}beregnFartBasertPaBredde(){const e=t(30),i=15/this.antallPerRad,s=e*i;return console.log("fart",s),s}hentPoengtekst(){return`Koronaer: ${this.poeng}`}tap(){this.scene.pause(),this.cameras.main.setBackgroundColor(12237498),this.cameras.main.setAlpha(.5),console.log("this.hentPoengtekst",this.hentPoengtekst()),console.log("this.poeng",this.poeng);const e={navn:this.spillernavn,poeng:this.poeng};console.log("resultat",e),this.poeng>0&&I(e),this.scene.launch("tap-sene",{resultat:e,vanskelighetsgrad:this.vanskelighetsgrad}),console.log("Ferdig i tap().")}visStartinfo(){this.scene.pause(),this.scene.launch("startinfo-sene",{spillernavn:this.spillernavn,vanskelighetsgrad:this.vanskelighetsgrad})}}class A extends d.Scene{constructor(){super({key:"startinfo-sene"});n(this,"bredde");n(this,"hoyde");n(this,"spillernavn");n(this,"vanskelighetsgrad")}init(e){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.spillernavn=e.spillernavn,this.vanskelighetsgrad=e.vanskelighetsgrad}create(){const e=`Er du klar?
Det blir vanskeligere etter hvert.
Trykk for \xE5 starte!`;this.add.text(this.bredde/2,this.hoyde/2,e,{fontFamily:"Kanit",fontSize:`${t(20)}px`,color:"#000",align:"center",backgroundColor:"#c6d4b7",padding:{x:10,y:10}}).setOrigin(.5,.5),setTimeout(()=>{this.input.once("pointerup",()=>{this.scene.start("spill-sene",{spillernavn:this.spillernavn,vanskelighetsgrad:this.vanskelighetsgrad})})},100)}}class D extends d.Scene{constructor(){super({key:"tap-sene"});n(this,"bredde");n(this,"hoyde");n(this,"forrigeResultat");n(this,"vanskelighetsgrad")}init(e){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.forrigeResultat=e.resultat,this.vanskelighetsgrad=e.vanskelighetsgrad}create(){const e=`Du klarte ${this.forrigeResultat.poeng}
Trykk for \xE5 pr\xF8ve igjen`;this.add.text(this.bredde/2,this.hoyde/2,e,{fontFamily:"Kanit",fontSize:`${t(25)}px`,color:"#000",align:"center",backgroundColor:"#c6d4b7",padding:{x:10,y:10}}).setOrigin(.5,.5),setTimeout(()=>{this.input.once("pointerup",()=>{this.scene.start("spill-sene",{spillernavn:this.forrigeResultat.navn,vanskelighetsgrad:this.vanskelighetsgrad})})},500)}}function N(){location.protocol!=="http:"&&"serviceWorker"in navigator&&(console.log("Korona: About to registering service worker."),new z("/sw.js").register())}const M=Date.now(),V=/iPad|iPhone|iPod/.test(navigator.userAgent);let S;window.onresize=()=>{V&&Date.now()-M<1e3||(clearTimeout(S),S=setTimeout(()=>{window.location.reload()},200))};function j(o,e,i,s,r){return{type:d.AUTO,scene:[E,B,$,R,A,D],parent:"spillkonteiner",width:o*s,height:e*s,dom:{createContainer:!0},backgroundColor:16774869,autoFocus:!0,render:{},physics:{default:"arcade",arcade:{gravity:{y:0},debug:r}},scale:{mode:i,autoCenter:d.Scale.Center.CENTER_BOTH,zoom:1/s}}}let x=!0;x=!1;const W={minsteRatio:.4,storsteRatio:.8,minsteBredde:320,storsteBredde:768,minsteHoyde:800,storsteHoyde:1024};let u=window.devicePixelRatio;u!==1&&u!==2&&u!==3&&(u=1);globalThis.pikselratio=u;const b=K(W,window.innerWidth,window.innerHeight),C=b.skaleringsmetode===H.Tilpass?d.Scale.ScaleModes.FIT:d.Scale.ScaleModes.NONE,L=j(b.bredde,b.hoyde,C,u,x);new d.Game(L);N();

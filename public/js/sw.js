// h :/
console.log(self);
async function checkForSelfDestruct(){
  let regs = await self.navigator.serviceWorker.getRegistrations();
  if(regs.length<3){
    return;
  }
  for (let reg of regs) {
    if(reg === self){
      continue;
    }
    if (reg.active.scriptURL.includes("/js/")) {
      reg.unregister();
      console.log("done!");
      break;
    }
  }
}
checkForSelfDestruct()
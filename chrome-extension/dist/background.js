(()=>{"use strict";function e(e){const o=new Blob([e],{type:"text/plain"}),n=URL.createObjectURL(o),t=`logs/app_${(new Date).toLocaleDateString().replace(/\//g,".")}.log`;console.log(`Saving log to: ${t}`),chrome.downloads.download({url:n,filename:t,saveAs:!1}),console.log(`Logs saved to file: ${t}`)}console.log("Service worker registration starting"),chrome.runtime.onInstalled.addListener((()=>{console.log("Extension Installed!")})),chrome.runtime.onMessage.addListener(((o,n,t)=>{if(console.log("Received message in background:",o),"processFile"===o.action){const n=o.fileContent;if(!n)return console.log("No file content to process."),void t({error:"No file content to process."});(async function(o){try{const n=await fetch("https://stg-ps.prompt.security/api/protect",{method:"POST",headers:{"Content-Type":"application/json","APP-ID":"9d36e6ee-0564-41d6-92f9-bf0da89e3682"},body:JSON.stringify({prompt:o})}),t=await n.json(),r=`API Response: ${JSON.stringify(t,null,2)}`;return console.log(r),e(r),t}catch(o){throw e(`Error during file processing: ${o}`),new Error("Error during file processing: "+o)}})(n).then((e=>{t({result:e})})).catch((e=>{console.log("Response error.."),t({error:e.message})}))}return!0}))})();
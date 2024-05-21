exports.id=53,exports.ids=[53],exports.modules={915:(e,t,n)=>{n.r(t),n.d(t,{AIProviderService:()=>AIProviderService,getApiKey:()=>T,getMaxCharacters:()=>A});var a=n(1398),i=n(5287),o=n(5313),r=n(9634),s=n(4832);async function l(e,t){let n,i;let o=await (await e.ai)?.getModels()??[];null!=t?n=t:t=s.H.get("ai.experimental.provider")??"openai";let r=s.H.get(`ai.experimental.${t}.model`),l=[];for(let e of o){if(e.hidden||null!=n&&e.provider.id===n)continue;i!==e.provider.id&&(i=e.provider.id,l.push({label:e.provider.name,kind:a.QuickPickItemKind.Separator}));let o=e.provider.id===t&&(e.id===r||null==r&&e.default);l.push({label:e.provider.name,description:o?`${e.name}  \u2713`:e.name,provider:e.provider.id,model:e.id,picked:o})}return await a.window.showQuickPick(l,{title:"Switch AI Model",placeHolder:"select an AI model to use for experimental AI features",matchOnDescription:!0})}var d=n(3131),h=n(2471),c=n(3459),m=n(8803);let u={id:"anthropic",name:"Anthropic"};function p(e){return"claude-instant-1"===e.id||"claude-2"===e.id}let g=[{id:"claude-3-opus-20240229",name:"Claude 3 Opus",maxTokens:2e5,provider:u},{id:"claude-3-sonnet-20240229",name:"Claude 3 Sonnet",maxTokens:2e5,provider:u},{id:"claude-3-haiku-20240307",name:"Claude 3 Haiku",maxTokens:2e5,provider:u,default:!0},{id:"claude-2.1",name:"Claude 2.1",maxTokens:2e5,provider:u},{id:"claude-2",name:"Claude 2.0",maxTokens:1e5,provider:u},{id:"claude-instant-1",name:"Claude Instant",maxTokens:1e5,provider:u}];let AnthropicProvider=class AnthropicProvider{constructor(e){this.container=e}id=u.id;name=u.name;dispose(){}getModels(){return Promise.resolve(g)}get model(){return s.H.get("ai.experimental.anthropic.model")||null}async getOrChooseModel(){let e=this.model;if(null==e){let t=await l(this.container,this.id);if(null==t)return;await s.H.updateEffective(`ai.experimental.${t.provider}.model`,t.model),e=t.model}return g.find(t=>t.id===e)}async generateCommitMessage(e,t){let n=await f(this.container.storage);if(null==n)return;let i=await this.getOrChooseModel();if(null==i)return;let o=s.H.get("experimental.generateCommitMessagePrompt");o.endsWith(".")||(o+=".");let r=`You are an advanced AI programming assistant tasked with summarizing code changes into a concise and meaningful commit message. Compose a commit message that:
- Strictly synthesizes meaningful information from the provided code diff
- Utilizes any additional user-provided context to comprehend the rationale behind the code changes
- Is clear and brief, with an informal yet professional tone, and without superfluous descriptions
- Avoids unnecessary phrases such as "this commit", "this change", and the like
- Avoids direct mention of specific code identifiers, names, or file names, unless they are crucial for understanding the purpose of the changes
- Most importantly emphasizes the 'why' of the change, its benefits, or the problem it addresses rather than only the 'what' that changed

Follow the user's instructions carefully, don't repeat yourself, don't include the code in the output, or make anything up!`;try{let s,l;return p(i)?[s,l]=await this.makeLegacyRequest(i,n,n=>{let a=e.substring(0,n),i=`

Human: ${r}

Human: Here is the code diff to use to generate the commit message:

${a}
`;return t?.context&&(i+=`
Human: Here is additional context which should be taken into account when generating the commit message:

${t.context}
`),o&&(i+=`
Human: ${o}
`),i+="\nAssistant:"},4096,t?.cancellation):[s,l]=await this.makeRequest(i,n,r,n=>{let a=e.substring(0,n),i={role:"user",content:[{type:"text",text:"Here is the code diff to use to generate the commit message:"},{type:"text",text:a}]};return t?.context&&i.content.push({type:"text",text:"Here is additional context which should be taken into account when generating the commit message:"},{type:"text",text:t.context}),o&&i.content.push({type:"text",text:o}),[i]},4096,t?.cancellation),e.length>l&&a.window.showWarningMessage(`The diff of the changes had to be truncated to ${l} characters to fit within the Anthropic's limits.`),s}catch(e){throw Error(`Unable to generate commit message: ${e.message}`)}}async explainChanges(e,t,n){let i=await f(this.container.storage);if(null==i)return;let o=await this.getOrChooseModel();if(null==o)return;let r=`You are an advanced AI programming assistant tasked with summarizing code changes into an explanation that is both easy to understand and meaningful. Construct an explanation that:
- Concisely synthesizes meaningful information from the provided code diff
- Incorporates any additional context provided by the user to understand the rationale behind the code changes
- Places the emphasis on the 'why' of the change, clarifying its benefits or addressing the problem that necessitated the change, beyond just detailing the 'what' has changed

Do not make any assumptions or invent details that are not supported by the code diff or the user-provided context.`;try{let s,l;return p(o)?[s,l]=await this.makeLegacyRequest(o,i,n=>{let a=t.substring(0,n);return`

Human: ${r}

Human: Here is additional context provided by the author of the changes, which should provide some explanation to why these changes where made. Please strongly consider this information when generating your explanation:

${e}

Human: Now, kindly explain the following code diff in a way that would be clear to someone reviewing or trying to understand these changes:

${a}

Human: Remember to frame your explanation in a way that is suitable for a reviewer to quickly grasp the essence of the changes, the issues they resolve, and their implications on the codebase. And please don't explain how you arrived at the explanation, just provide the explanation.
Assistant:`},4096,n?.cancellation):[s,l]=await this.makeRequest(o,i,r,n=>{let a=t.substring(0,n);return[{role:"user",content:[{type:"text",text:"Here is additional context provided by the author of the changes, which should provide some explanation to why these changes where made. Please strongly consider this information when generating your explanation:"},{type:"text",text:e},{type:"text",text:"Now, kindly explain the following code diff in a way that would be clear to someone reviewing or trying to understand these changes:"},{type:"text",text:a},{type:"text",text:"Remember to frame your explanation in a way that is suitable for a reviewer to quickly grasp the essence of the changes, the issues they resolve, and their implications on the codebase. And please don't explain how you arrived at the explanation, just provide the explanation"}]}]},4096,n?.cancellation),t.length>l&&a.window.showWarningMessage(`The diff of the changes had to be truncated to ${l} characters to fit within the Anthropic's limits.`),s}catch(e){throw Error(`Unable to explain changes: ${e.message}`)}}async fetch(e,t,n,a){let i;null!=a&&(i=new AbortController,a.onCancellationRequested(()=>i?.abort()));try{return await (0,c.hd)(p(e)?"https://api.anthropic.com/v1/complete":"https://api.anthropic.com/v1/messages",{headers:{Accept:"application/json",Authorization:`Bearer ${t}`,"Content-Type":"application/json","X-API-Key":t,"anthropic-version":"2023-06-01"},method:"POST",body:JSON.stringify(n)})}catch(e){if("AbortError"===e.name)throw new m.AL(e);throw e}}async makeRequest(e,t,n,a,i,o){let r=0,s=A(e,2600);for(;;){let l={model:e.id,messages:a(s),system:n,stream:!1,max_tokens:i},d=await this.fetch(e,t,l,o);if(!d.ok){let e;try{e=await d.json()}catch{}if(r++<2&&e?.error?.type==="invalid_request_error"&&e?.error?.message?.includes("prompt is too long")){s-=500*r;continue}throw Error(`(${this.name}:${d.status}) ${e?.error?.message||d.statusText})`)}return[(await d.json()).content.map(e=>e.text).join("\n").trim(),s]}}async makeLegacyRequest(e,t,n,a,i){let o=0,r=A(e,2600);for(;;){let s={model:e.id,prompt:n(r),stream:!1,max_tokens_to_sample:a},l=await this.fetch(e,t,s,i);if(!l.ok){let e;try{e=await l.json()}catch{}if(o++<2&&e?.error?.type==="invalid_request_error"&&e?.error?.message?.includes("prompt is too long")){r-=500*o;continue}throw Error(`(${this.name}:${l.status}) ${e?.error?.message||l.statusText})`)}return[(await l.json()).completion.trim(),r]}}};async function f(e){return T(e,{id:u.id,name:u.name,validator:e=>/(?:sk-)?[a-zA-Z0-9-_]{32,}/.test(e),url:"https://console.anthropic.com/account/keys"})}let w={id:"gemini",name:"Google"},y=[{id:"gemini-1.5-pro-latest",name:"Gemini 1.5 Pro",maxTokens:1048576,provider:w,default:!0},{id:"gemini-1.0-pro",name:"Gemini 1.0 Pro",maxTokens:30720,provider:w}];let GeminiProvider=class GeminiProvider{constructor(e){this.container=e}id=w.id;name=w.name;dispose(){}getModels(){return Promise.resolve(y)}get model(){return s.H.get("ai.experimental.gemini.model")||null}async getOrChooseModel(){let e=this.model;if(null==e){let t=await l(this.container,this.id);if(null==t)return;await s.H.updateEffective(`ai.experimental.${t.provider}.model`,t.model),e=t.model}return y.find(t=>t.id===e)}async generateCommitMessage(e,t){let n=await x(this.container.storage);if(null==n)return;let i=await this.getOrChooseModel();if(null==i)return;let o=A(i,2600);for(;;){let r=e.substring(0,o),l=s.H.get("experimental.generateCommitMessagePrompt");l.endsWith(".")||(l+=".");let d={systemInstruction:{parts:[{text:`You are an advanced AI programming assistant tasked with summarizing code changes into a concise and meaningful commit message. Compose a commit message that:
- Strictly synthesizes meaningful information from the provided code diff
- Utilizes any additional user-provided context to comprehend the rationale behind the code changes
- Is clear and brief, with an informal yet professional tone, and without superfluous descriptions
- Avoids unnecessary phrases such as "this commit", "this change", and the like
- Avoids direct mention of specific code identifiers, names, or file names, unless they are crucial for understanding the purpose of the changes
- Most importantly emphasizes the 'why' of the change, its benefits, or the problem it addresses rather than only the 'what' that changed

Follow the user's instructions carefully, don't repeat yourself, don't include the code in the output, or make anything up!`}]},contents:[{role:"user",parts:[{text:`Here is the code diff to use to generate the commit message:

${r}`},...t?.context?[{text:`Here is additional context which should be taken into account when generating the commit message:

${t.context}`}]:[],{text:l}]}]},h=await this.fetch(i.id,n,d,t?.cancellation);if(!h.ok){let e;try{e=await h.json()}catch{}throw Error(`Unable to generate commit message: (${this.name}:${h.status}) ${e?.error?.message||h.statusText}`)}return e.length>o&&a.window.showWarningMessage(`The diff of the changes had to be truncated to ${o} characters to fit within the Gemini's limits.`),(await h.json()).candidates[0].content.parts[0].text.trim()}}async explainChanges(e,t,n){let i=await x(this.container.storage);if(null==i)return;let o=await this.getOrChooseModel();if(null==o)return;let r=A(o,3e3);for(;;){let s=t.substring(0,r),l={systemInstruction:{parts:[{text:`You are an advanced AI programming assistant tasked with summarizing code changes into an explanation that is both easy to understand and meaningful. Construct an explanation that:
- Concisely synthesizes meaningful information from the provided code diff
- Incorporates any additional context provided by the user to understand the rationale behind the code changes
- Places the emphasis on the 'why' of the change, clarifying its benefits or addressing the problem that necessitated the change, beyond just detailing the 'what' has changed

Do not make any assumptions or invent details that are not supported by the code diff or the user-provided context.`}]},contents:[{role:"user",parts:[{text:`Here is additional context provided by the author of the changes, which should provide some explanation to why these changes where made. Please strongly consider this information when generating your explanation:

${e}`},{text:`Now, kindly explain the following code diff in a way that would be clear to someone reviewing or trying to understand these changes:

${s}`},{text:"Remember to frame your explanation in a way that is suitable for a reviewer to quickly grasp the essence of the changes, the issues they resolve, and their implications on the codebase."}]}]},d=await this.fetch(o.id,i,l,n?.cancellation);if(!d.ok){let e;try{e=await d.json()}catch{}throw Error(`Unable to explain commit: (${this.name}:${d.status}) ${e?.error?.message||d.statusText}`)}return t.length>r&&a.window.showWarningMessage(`The diff of the changes had to be truncated to ${r} characters to fit within the Gemini's limits.`),(await d.json()).candidates[0].content.parts[0].text.trim()}}async fetch(e,t,n,a){let i;null!=a&&(i=new AbortController,a.onCancellationRequested(()=>i?.abort()));try{return await (0,c.hd)(`https://generativelanguage.googleapis.com/v1beta/models/${e}:generateContent`,{headers:{Accept:"application/json","Content-Type":"application/json","x-goog-api-key":t},method:"POST",body:JSON.stringify(n),signal:i?.signal})}catch(e){if("AbortError"===e.name)throw new m.AL(e);throw e}}};async function x(e){return T(e,{id:w.id,name:w.name,validator:()=>!0,url:"https://aistudio.google.com/app/apikey"})}let v={id:"openai",name:"OpenAI"},b=[{id:"gpt-4-turbo",name:"GPT-4 Turbo with Vision",maxTokens:128e3,provider:v},{id:"gpt-4-turbo-2024-04-09",name:"GPT-4 Turbo Preview (2024-04-09)",maxTokens:128e3,provider:v,hidden:!0},{id:"gpt-4-turbo-preview",name:"GPT-4 Turbo Preview",maxTokens:128e3,provider:v,default:!0},{id:"gpt-4-0125-preview",name:"GPT-4 0125 Preview",maxTokens:128e3,provider:v,hidden:!0},{id:"gpt-4-1106-preview",name:"GPT-4 1106 Preview",maxTokens:128e3,provider:v,hidden:!0},{id:"gpt-4",name:"GPT-4",maxTokens:8192,provider:v},{id:"gpt-4-0613",name:"GPT-4 0613",maxTokens:8192,provider:v,hidden:!0},{id:"gpt-4-32k",name:"GPT-4 32k",maxTokens:32768,provider:v},{id:"gpt-4-32k-0613",name:"GPT-4 32k 0613",maxTokens:32768,provider:v,hidden:!0},{id:"gpt-3.5-turbo",name:"GPT-3.5 Turbo",maxTokens:16385,provider:v},{id:"gpt-3.5-turbo-0125",name:"GPT-3.5 Turbo 0125",maxTokens:16385,provider:v,hidden:!0},{id:"gpt-3.5-turbo-1106",name:"GPT-3.5 Turbo 1106",maxTokens:16385,provider:v,hidden:!0},{id:"gpt-3.5-turbo-16k",name:"GPT-3.5 Turbo 16k",maxTokens:16385,provider:v,hidden:!0}];let OpenAIProvider=class OpenAIProvider{constructor(e){this.container=e}id=v.id;name=v.name;dispose(){}getModels(){return Promise.resolve(b)}get model(){return s.H.get("ai.experimental.openai.model")||null}get url(){return s.H.get("ai.experimental.openai.url")||"https://api.openai.com/v1/chat/completions"}async getOrChooseModel(){let e=this.model;if(null==e){let t=await l(this.container,this.id);if(null==t)return;await s.H.updateEffective(`ai.experimental.${t.provider}.model`,t.model),e=t.model}return b.find(t=>t.id===e)}async generateCommitMessage(e,t){let n=await k(this.container.storage);if(null==n)return;let i=await this.getOrChooseModel();if(null==i)return;let o=0,r=A(i,2600);for(;;){let l=e.substring(0,r),d=s.H.get("experimental.generateCommitMessagePrompt");d.endsWith(".")||(d+=".");let h={model:i.id,messages:[{role:"system",content:`You are an advanced AI programming assistant tasked with summarizing code changes into a concise and meaningful commit message. Compose a commit message that:
- Strictly synthesizes meaningful information from the provided code diff
- Utilizes any additional user-provided context to comprehend the rationale behind the code changes
- Is clear and brief, with an informal yet professional tone, and without superfluous descriptions
- Avoids unnecessary phrases such as "this commit", "this change", and the like
- Avoids direct mention of specific code identifiers, names, or file names, unless they are crucial for understanding the purpose of the changes
- Most importantly emphasizes the 'why' of the change, its benefits, or the problem it addresses rather than only the 'what' that changed

Follow the user's instructions carefully, don't repeat yourself, don't include the code in the output, or make anything up!`},{role:"user",content:`Here is the code diff to use to generate the commit message:

${l}`},...t?.context?[{role:"user",content:`Here is additional context which should be taken into account when generating the commit message:

${t.context}`}]:[],{role:"user",content:d}]},c=await this.fetch(n,h,t?.cancellation);if(!c.ok){let e;if(404===c.status)throw Error(`Unable to generate commit message: Your API key doesn't seem to have access to the selected '${i.id}' model`);if(429===c.status)throw Error(`Unable to generate commit message: (${this.name}:${c.status}) Too many requests (rate limit exceeded) or your API key is associated with an expired trial`);try{e=await c.json()}catch{}if(o++<2&&e?.error?.code==="context_length_exceeded"){r-=500*o;continue}throw Error(`Unable to generate commit message: (${this.name}:${c.status}) ${e?.error?.message||c.statusText}`)}return e.length>r&&a.window.showWarningMessage(`The diff of the changes had to be truncated to ${r} characters to fit within the OpenAI's limits.`),(await c.json()).choices[0].message.content.trim()}}async explainChanges(e,t,n){let i=await k(this.container.storage);if(null==i)return;let o=await this.getOrChooseModel();if(null==o)return;let r=0,s=A(o,3e3);for(;;){let l=t.substring(0,s),d={model:o.id,messages:[{role:"system",content:`You are an advanced AI programming assistant tasked with summarizing code changes into an explanation that is both easy to understand and meaningful. Construct an explanation that:
- Concisely synthesizes meaningful information from the provided code diff
- Incorporates any additional context provided by the user to understand the rationale behind the code changes
- Places the emphasis on the 'why' of the change, clarifying its benefits or addressing the problem that necessitated the change, beyond just detailing the 'what' has changed

Do not make any assumptions or invent details that are not supported by the code diff or the user-provided context.`},{role:"user",content:`Here is additional context provided by the author of the changes, which should provide some explanation to why these changes where made. Please strongly consider this information when generating your explanation:

${e}`},{role:"user",content:`Now, kindly explain the following code diff in a way that would be clear to someone reviewing or trying to understand these changes:

${l}`},{role:"user",content:"Remember to frame your explanation in a way that is suitable for a reviewer to quickly grasp the essence of the changes, the issues they resolve, and their implications on the codebase."}]},h=await this.fetch(i,d,n?.cancellation);if(!h.ok){let e;if(404===h.status)throw Error(`Unable to explain commit: Your API key doesn't seem to have access to the selected '${o.id}' model`);if(429===h.status)throw Error(`Unable to explain commit: (${this.name}:${h.status}) Too many requests (rate limit exceeded) or your API key is associated with an expired trial`);try{e=await h.json()}catch{}if(r++<2&&e?.error?.code==="context_length_exceeded"){s-=500*r;continue}throw Error(`Unable to explain commit: (${this.name}:${h.status}) ${e?.error?.message||h.statusText}`)}return t.length>s&&a.window.showWarningMessage(`The diff of the changes had to be truncated to ${s} characters to fit within the OpenAI's limits.`),(await h.json()).choices[0].message.content.trim()}}async fetch(e,t,n){let a;let i=this.url,o=i.includes(".azure.com");null!=n&&(a=new AbortController,n.onCancellationRequested(()=>a?.abort()));try{return(0,c.hd)(i,{headers:{Accept:"application/json","Content-Type":"application/json",...o?{"api-key":e}:{Authorization:`Bearer ${e}`}},method:"POST",body:JSON.stringify(t),signal:a?.signal})}catch(e){if("AbortError"===e.name)throw new m.AL(e);throw e}}};async function k(e){return T(e,{id:v.id,name:v.name,validator:e=>/(?:sk-)?[a-zA-Z0-9]{32,}/.test(e),url:"https://platform.openai.com/account/api-keys"})}let $=new Map([["openai",OpenAIProvider],["anthropic",AnthropicProvider],["gemini",GeminiProvider]]);let AIProviderService=class AIProviderService{constructor(e){this.container=e}_provider;dispose(){this._provider?.dispose()}get providerId(){return this._provider?.id}async getModels(){let e=[...$.values()].map(e=>new e(this.container));return(await Promise.allSettled(e.map(e=>e.getModels()))).flatMap(e=>(0,d.Ro)(e,[]))}async generateCommitMessage(e,t){let n;if(Array.isArray(e))n=e.join("\n");else{let a=(0,r.Z6)(e)?e:this.container.git.getRepository(e);if(null==a)throw Error("Unable to find repository");let i=await this.container.git.getDiff(a.uri,o.id);if(!i?.contents&&(i=await this.container.git.getDiff(a.uri,o.SU),!i?.contents))throw Error("No changes to generate a commit message from.");if(t?.cancellation?.isCancellationRequested)return;n=i.contents}let i=await this.getOrChooseProvider();if(null!=i&&await P(i,this.container.storage)&&!t?.cancellation?.isCancellationRequested)return t?.progress!=null?a.window.withProgress(t.progress,async()=>i.generateCommitMessage(n,{cancellation:t?.cancellation,context:t?.context})):i.generateCommitMessage(n,{cancellation:t?.cancellation,context:t?.context})}async explainCommit(e,t,n){let o;if("string"==typeof e||e instanceof a.Uri){if("string"!=typeof t||!t)throw Error("Invalid arguments provided");o=await this.container.git.getCommit(e,t)}else{if("string"==typeof t)throw Error("Invalid arguments provided");o=(0,i.WM)(e)?e:await this.container.git.getCommit(e.repoPath,e.ref),n=t}if(null==o)throw Error("Unable to find commit");let r=await this.container.git.getDiff(o.repoPath,o.sha);if(!r?.contents)throw Error("No changes found to explain.");let s=await this.getOrChooseProvider();if(null!=s&&await P(s,this.container.storage))return(o.hasFullDetails()||(await o.ensureFullDetails(),(0,i.aQ)(o)),n?.progress!=null)?a.window.withProgress(n.progress,async()=>s.explainChanges(o.message,r.contents,{cancellation:n?.cancellation})):s.explainChanges(o.message,r.contents,{cancellation:n?.cancellation})}reset(){let{providerId:e}=this;null!=e&&(this.container.storage.deleteSecret(`gitlens.${e}.key`),this.container.storage.delete(`confirm:ai:tos:${e}`),this.container.storage.deleteWorkspace(`confirm:ai:tos:${e}`))}supports(e){return $.has(e)}async switchProvider(){await this.getOrChooseProvider(!0)}async getOrChooseProvider(e){let t=e?void 0:s.H.get("ai.experimental.provider")||void 0;if(null==t||!this.supports(t)){let e=await l(this.container);if(null==e)return;t=e.provider,await s.H.updateEffective("ai.experimental.provider",t),await s.H.updateEffective(`ai.experimental.${t}.model`,e.model)}if(t!==this._provider?.id){this._provider?.dispose();let e=$.get(t);null==e&&"openai"!==t&&(e=$.get("openai"),await s.H.updateEffective("ai.experimental.provider","openai")),null!=e&&(this._provider=new e(this.container))}return this._provider}};async function P(e,t){if(t.get(`confirm:ai:tos:${e.id}`,!1)||t.getWorkspace(`confirm:ai:tos:${e.id}`,!1))return!0;let n={title:"Continue"},i={title:"Always for this Workspace"},o={title:"Always"},r=await a.window.showInformationMessage(`GitLens experimental AI features require sending a diff of the code changes to ${e.name} for analysis. This may contain sensitive information.

Do you want to continue?`,{modal:!0},n,i,o,{title:"Cancel",isCloseAffordance:!0});return r===n||(r===i?(t.storeWorkspace(`confirm:ai:tos:${e.id}`,!0),!0):r===o&&(t.store(`confirm:ai:tos:${e.id}`,!0),!0))}function A(e,t){let n=3.1*e.maxTokens-t/3.1;return Math.floor(n-.1*n)}async function T(e,t){let n=await e.getSecret(`gitlens.${t.id}.key`);if(!n){let i=a.window.createInputBox();i.ignoreFocusOut=!0;let o=[];try{let e={iconPath:new a.ThemeIcon("link-external"),tooltip:`Open the ${t.name} API Key Page`};n=await new Promise(n=>{o.push(i.onDidHide(()=>n(void 0)),i.onDidChangeValue(e=>{if(e&&!t.validator(e)){i.validationMessage=`Please enter a valid ${t.name} API key`;return}i.validationMessage=void 0}),i.onDidAccept(()=>{let e=i.value.trim();if(!e||!t.validator(e)){i.validationMessage=`Please enter a valid ${t.name} API key`;return}n(e)}),i.onDidTriggerButton(n=>{n===e&&a.env.openExternal(a.Uri.parse(t.url))})),i.password=!0,i.title=`Connect to ${t.name}`,i.placeholder=`Please enter your ${t.name} API key to use this feature`,i.prompt=(0,h.Av)("input-prompt-links")?`Enter your [${t.name} API Key](${t.url} "Get your ${t.name} API key")`:`Enter your ${t.name} API Key`,i.buttons=[e],i.show()})}finally{i.dispose(),o.forEach(e=>void e.dispose())}if(!n)return;e.storeSecret(`gitlens.${t.id}.key`,n)}return n}}};
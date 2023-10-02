import{_ as e,o as l,c as p,k as s,a as o,t as n,Q as t}from"./chunks/framework.fd95ed2e.js";const i="/preview-1.png",c="/preview-2.png",r="/preview-3.png",d="/preview-4.png",_=JSON.parse('{"title":"CLI","description":"The Command Line Interface and developer tooling for JSX email","frontmatter":{"title":"CLI","description":"The Command Line Interface and developer tooling for JSX email","slug":"cli","head":[["meta",{"name":"og:description","content":"The Command Line Interface and developer tooling for JSX email"}],["meta",{"name":"og:image","content":"https://jsx.email/og.png"}],["meta",{"name":"og:site_name","content":"JSX email"}],["meta",{"name":"og:title","content":"CLI"}],["meta",{"name":"og:type","content":"website"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:description","content":"The Command Line Interface and developer tooling for JSX email"}],["meta",{"name":"twitter:image","content":"https://jsx.email/og.png"}],["meta",{"name":"twitter:title","content":"CLI"}]]},"headers":[],"relativePath":"../../../docs/core/cli.md","filePath":"../../../docs/core/cli.md"}'),m={name:"../../../docs/core/cli.md"},y={id:"frontmatter-title",tabindex:"-1"},h=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),E=t(`<h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#DCDCAA;">pnpm</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">add</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">@jsx-email/cli</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">-D</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;"># We recommend pnpm - https://pnpm.io</span></span>
<span class="line"><span style="color:#6A9955;"># But npm and yarn are supported</span></span>
<span class="line"><span style="color:#6A9955;"># npm add @jsx-email/cli -D</span></span>
<span class="line"><span style="color:#6A9955;"># yarn add @jsx-email/cli -D</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#7EB233;">pnpm</span><span style="color:#002339;"> </span><span style="color:#A44185;">add</span><span style="color:#002339;"> </span><span style="color:#A44185;">@jsx-email/cli</span><span style="color:#002339;"> </span><span style="color:#174781;">-D</span></span>
<span class="line"></span>
<span class="line"><span style="color:#357B42;font-style:italic;"># We recommend pnpm - https://pnpm.io</span></span>
<span class="line"><span style="color:#357B42;font-style:italic;"># But npm and yarn are supported</span></span>
<span class="line"><span style="color:#357B42;font-style:italic;"># npm add @jsx-email/cli -D</span></span>
<span class="line"><span style="color:#357B42;font-style:italic;"># yarn add @jsx-email/cli -D</span></span></code></pre></div><p>Nearly all installations of this package will want it installed into <code>devDependencies</code> so please make sure to add the <code>-D</code> flag.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>Installing this package will add an <code>email</code> binary, which will be available to <code>pnpm exec</code>, <code>npx</code>, and <code>yarn</code>.</p><p>Invoking the CLI without parameters or flags will produce help information in the console. From there, all of the functions of the CLI can be viewed, along with any applicable parameters and flags:</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">→ pnpm exec email</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6;">@jsx-email/cli v0.0.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6;">A CLI for working with Email Templates made with jsx-email</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6;">Usage</span></span>
<span class="line"><span style="color:#E6E6E6;">  $ email [...options]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6;">Commands</span></span>
<span class="line"><span style="color:#E6E6E6;">  build       &lt;template path&gt;</span></span>
<span class="line"><span style="color:#E6E6E6;">  create      &lt;template name&gt;</span></span>
<span class="line"><span style="color:#E6E6E6;">  help        [&lt;command&gt;]</span></span>
<span class="line"><span style="color:#E6E6E6;">  preview     &lt;template dir path&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6;">Options</span></span>
<span class="line"><span style="color:#E6E6E6;">  --help      Displays this message</span></span>
<span class="line"><span style="color:#E6E6E6;">  --version   Displays webpack-nano and webpack versions</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6;">Examples</span></span>
<span class="line"><span style="color:#E6E6E6;">  $ email</span></span>
<span class="line"><span style="color:#E6E6E6;">  $ email --help</span></span>
<span class="line"><span style="color:#E6E6E6;">  $ email build ./src/templates/Invite.tsx</span></span>
<span class="line"><span style="color:#E6E6E6;">  $ email create invite</span></span>
<span class="line"><span style="color:#E6E6E6;">  $ email preview ./src/templates</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">→ pnpm exec email</span></span>
<span class="line"></span>
<span class="line"><span style="color:#002339;">@jsx-email/cli v0.0.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#002339;">A CLI for working with Email Templates made with jsx-email</span></span>
<span class="line"></span>
<span class="line"><span style="color:#002339;">Usage</span></span>
<span class="line"><span style="color:#002339;">  $ email [...options]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#002339;">Commands</span></span>
<span class="line"><span style="color:#002339;">  build       &lt;template path&gt;</span></span>
<span class="line"><span style="color:#002339;">  create      &lt;template name&gt;</span></span>
<span class="line"><span style="color:#002339;">  help        [&lt;command&gt;]</span></span>
<span class="line"><span style="color:#002339;">  preview     &lt;template dir path&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#002339;">Options</span></span>
<span class="line"><span style="color:#002339;">  --help      Displays this message</span></span>
<span class="line"><span style="color:#002339;">  --version   Displays webpack-nano and webpack versions</span></span>
<span class="line"></span>
<span class="line"><span style="color:#002339;">Examples</span></span>
<span class="line"><span style="color:#002339;">  $ email</span></span>
<span class="line"><span style="color:#002339;">  $ email --help</span></span>
<span class="line"><span style="color:#002339;">  $ email build ./src/templates/Invite.tsx</span></span>
<span class="line"><span style="color:#002339;">  $ email create invite</span></span>
<span class="line"><span style="color:#002339;">  $ email preview ./src/templates</span></span></code></pre></div><p>To view help for specific commands, use <code>email help &lt;command&gt;</code>. e.g. <code>email help build</code>.</p><h2 id="preview-tool" tabindex="-1">Preview Tool <a class="header-anchor" href="#preview-tool" aria-label="Permalink to &quot;Preview Tool&quot;">​</a></h2><p>JSX email ships with a Preview Tool as part of the CLI. Our Preview is fast, simple, and smooth. It doesn&#39;t require installing any crazy dependencies, downloading additional &quot;clients,&quot; or copying your project&#39;s dependencies. It just works. And the best part: it works with monorepos out of the box.</p><p>To use the Preview Tool, open your terminal and navigate to your project. We&#39;re assuming you&#39;ve already installed the CLI as shown above, and that you&#39;ve already run <code>email create</code> to create an email in an <code>emails</code> directory.</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">$ cd </span><span style="color:#D4D4D4;">~</span><span style="color:#E6E6E6;">/code/email-app</span></span>
<span class="line"><span style="color:#E6E6E6;">$ email preview ./emails</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">$ cd </span><span style="color:#7B30D0;">~</span><span style="color:#002339;">/code/email-app</span></span>
<span class="line"><span style="color:#002339;">$ email preview ./emails</span></span></code></pre></div><p>The Preview Tool will start up and open a new window in your browser, and you&#39;ll be presented with a page that looks like:</p><p><img src="`+i+'" alt="Preview 1"><br><br><img src="'+c+'" alt="Preview 1"><br><br><img src="'+r+'" alt="Preview 1"><br><br><img src="'+d+'" alt="Preview 1"></p>',14);function g(a,v,w,u,f,b){return l(),p("div",null,[s("h2",y,[o(n(a.$frontmatter.title)+" ",1),h]),s("p",null,n(a.$frontmatter.description),1),E])}const C=e(m,[["render",g]]);export{_ as __pageData,C as default};

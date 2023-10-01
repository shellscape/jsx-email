import{_ as l,o as e,c as p,k as s,a as o,t as n,Q as t}from"./chunks/framework.fd95ed2e.js";const u=JSON.parse('{"title":"CLI","description":"The Command Line Interface and developer tooling for JSX email","frontmatter":{"title":"CLI","description":"The Command Line Interface and developer tooling for JSX email","slug":"cli"},"headers":[],"relativePath":"../../../docs/core/cli.md","filePath":"../../../docs/core/cli.md"}'),c={name:"../../../docs/core/cli.md"},i={id:"frontmatter-title",tabindex:"-1"},r=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),d=t(`<h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#DCDCAA;">pnpm</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">add</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">@jsx-email/cli</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">-D</span></span>
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
<span class="line"><span style="color:#002339;">  $ email preview ./src/templates</span></span></code></pre></div><p>To view help for specific commands, use <code>email help &lt;command&gt;</code>. e.g. <code>email help build</code>.</p>`,8);function m(a,y,E,h,g,f){return e(),p("div",null,[s("h2",i,[o(n(a.$frontmatter.title)+" ",1),r]),s("p",null,n(a.$frontmatter.description),1),d])}const k=l(c,[["render",m]]);export{u as __pageData,k as default};

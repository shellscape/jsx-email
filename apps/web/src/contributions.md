---
# Inspired by: https://vuemail.net/releases
# https://vitepress.dev/reference/default-theme-home-page
layout: page
sidebar: false
title: Follow the latest contributions and updates of jsx-email.
---

<script setup>
import { computed } from 'vue'
import { data as rawData } from "./api/contributions.data.ts"

const dataObject = computed(() => {
  const first = rawData[rawData.length - 1]
  const last = rawData[0]

  const processedData = {}

  rawData.map((pr) => {
    if (!pr.merged_at) return;

    const day = new Date(pr.merged_at).toISOString().split('T')[0]

    processedData[day] = [...processedData[day] ?? [], {
        author:
        { 
            img: pr.user.avatar_url, 
            name: pr.user.login, 
            url: pr.user.html_url,
        }, 
        pr: 
        {
            number: pr.number,
            title: pr.title,
            url: pr.html_url,
        }, 

    }]
  })

  const keysArray = Object.keys(processedData);

    keysArray.sort((a, b) => new Date(b) - new Date(a));

    const sortedData = {};
    keysArray.forEach(key => {
    sortedData[key] = processedData[key];
    });

  return sortedData
})

const data = Object.entries(dataObject.value)
</script>

<div :class="$style.timeline">
    <div :class="$style.container">
        <div :class="$style.timeline__wrapper">
            <div :class="$style.timeline__titleblock">
                <h2 :class="$style.timeline__titleblock_title">Contributions</h2>
                <p :class="$style.timeline__titleblock_desc">Explore the latest contributions to jsx-email </p>
                <a href="https://github.com/shellscape/jsx-email/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged" target="_blank" :class="$style.button">View on Github</a>
            </div>
            <div :class="$style.timeline__bar" />
            <template v-for="([day, event], index) in data">
                <div :class="$style.timeline__event" :style="{
                    marginLeft: index % 2 === 0 ? '-8px': '8px', 
                    transform: `translateX(${ index % 2 === 0 ? 50: -50}%)`,
                    flexDirection:  index % 2 === 0 ? 'row': 'row-reverse',
                    textAlign: index % 2 === 0 ? 'left': 'right'
                    }">
                    <div :class="$style.timeline__point" />
                    <div :class="$style.timeline__content_wrapper">
                        <p :class="$style.timeline__date">{{ new Date(day).toLocaleString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })}}</p>
                        <div v-for="entry in event" :class="$style.timeline__content">
                            <a :href="entry.author.url" target="_blank" :class="$style.timeline__pr_author" :style="{
                                alignSelf: index % 2 === 0 ? 'flex-start': 'flex-end',
                            }">
                            <img :class="$style.timeline__pr_authorimg" :src="entry.author.img"/>
                            {{entry.author.name}}</a>
                            <div :class="$style.timeline__pr">
                            #{{entry.pr.number}}: <a :href="entry.pr.url" target="_blank" :class="$style.timeline__pr_title">{{entry.pr.title}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <a href="https://github.com/shellscape/jsx-email/pulls?q=is%3Apr+is%3Aclosed+is%3Amerged" target="_blank" :class="$style.button" :style="{marginBottom: '1em'}" >View all on Github</a>
        </div>
    </div>

</div>

<style module>
.button{
    border-radius: 5px !important;
    font-size: inherit;
    font-weight: 500;
    padding: 0.1em 2em;
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
    line-height: 38px;
    z-index: 1;
}

.timeline {
    width: 100vw;
    height: calc(100vh - 80px);
    overflow: hidden;
}

.container {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.timeline__wrapper{
    width: 100%;
    position: relative;
    display: flex;
    gap: 32px;
    flex-direction: column;
    padding: 12px 0;
    align-items: center;
    justify-content: center;
}

@media (max-width: 640px){
    .timeline__wrapper{
        align-items: flex-start;
        padding: 16px;
    }
}

.timeline__bar {
    height: 100%;
    width: 0.125rem;
    background: #565656;
    position: absolute;
    top: 0;
    left: 50%; 
    right: 50%;
    margin-left: -1px;
    flex-shrink: 0;
}

@media (max-width: 640px){
    .timeline__bar{
        left: 16px;
    }
}

.timeline__titleblock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    background: rgba(44,42,43, 1);
    z-index: 1;
    padding: 24px 16px;
    border-radius: 12px;
    margin: 0 auto;
    margin-bottom: 2rem;
}

.timeline__titleblock_title{
    font-size: 1.875rem !important;
    line-height: 2.25rem;
    font-weight: 700 !important;
}

@media (min-width: 1024px){
    .timeline__titleblock_title {
        font-size: 3rem !important;
        line-height: 1;
    }
}

@media (min-width: 640px) {
    .timeline__titleblock_title {
        font-size: 2.25rem !important;
    line-height: 2.5rem;
    }
}


.timeline__titleblock_desc {
    margin-bottom: 1rem;
}

.timeline__event{
    display: flex;
    align-items: flex-start;
    gap: 32px;
    position: relative;
    width: 50%;
}

@media (max-width: 640px){
    .timeline__event{
        width: 100%;
        gap: 16px;
        margin-left: -4px !important;
        transform: translateX(0%) !important;
        flex-direction: row !important;
        text-align: left !important;
    }
}

.timeline__point {
    height: 8px;
    width: 8px;
    background: #565656;
    border-radius: 1000px;
    z-index: 1;
    margin-top: 8px;
    box-shadow: 0px 0px 2px 2px #565656;
}

.timeline__content_wrapper{
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.timeline__content {
    display: flex;
    flex-direction: column; 
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    opacity: 1;
}

.timeline__date{
    flex-shrink: 0;
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: #8E8373;
}

.timeline__version{
    font-size: 1.875rem;
    line-height: 2.25rem;  
    margin-top: 0.5rem;
    font-weight: 700;
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.timeline__pr {
    font-size: 0.875rem;
    line-height: 1.5rem;
    word-break: break-all;
    color: #8E8373;
}

.timeline__pr_authorimg{
    width: 16px;
    height: 16px;
    border-radius: 1000px;
    background: #8E8373;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 10;
}

@keyframes pulse {
    0%, 100% {
    opacity: 1;
    }
    50% {
    opacity: .5;
    }
}

.timeline__pr_author{
    width: max-content;
    color: #EFDAB9;
    font-size: 0.75rem;
    line-height: 1rem;
    display: inline-flex;
    gap: 2px;
    align-items: center;
    border-radius: 1000px;
    padding: 0.125rem 0.25rem;
    padding-right: 0.25rem;
    vertical-align: middle;
    box-shadow: 0px 0px 1px 1px #8E8373;
    background: rgb(142 131 115 / 20%);
    font-weight: 500;
}

@media (max-width: 640px){
    .timeline__pr_author{
      align-self: flex-start !important;
    }
}

.timeline__pr_title{
    color: #EFDAB9;
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.timeline__pr_author:hover{
    background: rgb(142 131 115 / 50%);
}

.timeline__version:hover, .timeline__pr_title:hover{
    color: #FFC152;
}
</style>

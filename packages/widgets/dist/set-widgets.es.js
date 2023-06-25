/*!
* @set/widgets v0.0.0 Sun Jun 25 2023 17:00:22 GMT+0800 (中国标准时间)
* (c) 2021 @mix.
* Released under the MIT License.
*/
import { defineComponent, inject, ref, watch, resolveComponent, openBlock, createElementBlock, createBlock, withCtx, createVNode, Fragment, createTextVNode, toDisplayString, createCommentVNode, computed, watchEffect, normalizeStyle, createSlots, renderList, mergeProps, renderSlot, createElementVNode } from "vue";
import { Alert, Upload, Modal, Tooltip, message } from "ant-design-vue";
import { UploadOutlined, PlusOutlined, LoadingOutlined, UserOutlined, DeleteOutlined, FormOutlined, InfoCircleFilled } from "@ant-design/icons-vue";
import { SetFormHelper } from "@set/utils";
var windi = /* @__PURE__ */ (() => '*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgba(59, 130, 246, .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000}*>.enter-x:nth-child(1){transform:translate(50px)}*>.-enter-x:nth-child(1){transform:translate(-50px)}*>.enter-x:nth-child(1),*>.-enter-x:nth-child(1){z-index:9;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.1s}*>.enter-y:nth-child(1){transform:translateY(50px)}*>.-enter-y:nth-child(1){transform:translateY(-50px)}*>.enter-y:nth-child(1),*>.-enter-y:nth-child(1){z-index:9;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.1s}*>.enter-x:nth-child(2){transform:translate(50px)}*>.-enter-x:nth-child(2){transform:translate(-50px)}*>.enter-x:nth-child(2),*>.-enter-x:nth-child(2){z-index:8;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.2s}*>.enter-y:nth-child(2){transform:translateY(50px)}*>.-enter-y:nth-child(2){transform:translateY(-50px)}*>.enter-y:nth-child(2),*>.-enter-y:nth-child(2){z-index:8;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.2s}*>.enter-x:nth-child(3){transform:translate(50px)}*>.-enter-x:nth-child(3){transform:translate(-50px)}*>.enter-x:nth-child(3),*>.-enter-x:nth-child(3){z-index:7;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.3s}*>.enter-y:nth-child(3){transform:translateY(50px)}*>.-enter-y:nth-child(3){transform:translateY(-50px)}*>.enter-y:nth-child(3),*>.-enter-y:nth-child(3){z-index:7;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.3s}*>.enter-x:nth-child(4){transform:translate(50px)}*>.-enter-x:nth-child(4){transform:translate(-50px)}*>.enter-x:nth-child(4),*>.-enter-x:nth-child(4){z-index:6;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.4s}*>.enter-y:nth-child(4){transform:translateY(50px)}*>.-enter-y:nth-child(4){transform:translateY(-50px)}*>.enter-y:nth-child(4),*>.-enter-y:nth-child(4){z-index:6;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.4s}*>.enter-x:nth-child(5){transform:translate(50px)}*>.-enter-x:nth-child(5){transform:translate(-50px)}*>.enter-x:nth-child(5),*>.-enter-x:nth-child(5){z-index:5;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.5s}*>.enter-y:nth-child(5){transform:translateY(50px)}*>.-enter-y:nth-child(5){transform:translateY(-50px)}*>.enter-y:nth-child(5),*>.-enter-y:nth-child(5){z-index:5;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.5s}*>.enter-x:nth-child(6){transform:translate(50px)}*>.-enter-x:nth-child(6){transform:translate(-50px)}*>.enter-x:nth-child(6),*>.-enter-x:nth-child(6){z-index:4;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.6s}*>.enter-y:nth-child(6){transform:translateY(50px)}*>.-enter-y:nth-child(6){transform:translateY(-50px)}*>.enter-y:nth-child(6),*>.-enter-y:nth-child(6){z-index:4;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.6s}*>.enter-x:nth-child(7){transform:translate(50px)}*>.-enter-x:nth-child(7){transform:translate(-50px)}*>.enter-x:nth-child(7),*>.-enter-x:nth-child(7){z-index:3;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.7s}*>.enter-y:nth-child(7){transform:translateY(50px)}*>.-enter-y:nth-child(7){transform:translateY(-50px)}*>.enter-y:nth-child(7),*>.-enter-y:nth-child(7){z-index:3;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.7s}*>.enter-x:nth-child(8){transform:translate(50px)}*>.-enter-x:nth-child(8){transform:translate(-50px)}*>.enter-x:nth-child(8),*>.-enter-x:nth-child(8){z-index:2;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.8s}*>.enter-y:nth-child(8){transform:translateY(50px)}*>.-enter-y:nth-child(8){transform:translateY(-50px)}*>.enter-y:nth-child(8),*>.-enter-y:nth-child(8){z-index:2;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.8s}*>.enter-x:nth-child(9){transform:translate(50px)}*>.-enter-x:nth-child(9){transform:translate(-50px)}*>.enter-x:nth-child(9),*>.-enter-x:nth-child(9){z-index:1;opacity:0;animation:enter-x-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.9s}*>.enter-y:nth-child(9){transform:translateY(50px)}*>.-enter-y:nth-child(9){transform:translateY(-50px)}*>.enter-y:nth-child(9),*>.-enter-y:nth-child(9){z-index:1;opacity:0;animation:enter-y-animation .4s ease-in-out .3s;animation-fill-mode:forwards;animation-delay:.9s}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}::moz-focus-inner{border-style:none;padding:0}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}b,strong{font-weight:bolder}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;padding:0;line-height:inherit;color:inherit}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}button{background-color:transparent;background-image:none}button,[role=button]{cursor:pointer}code,kbd,samp,pre{font-size:1em}fieldset{margin:0;padding:0}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}hr{height:0;color:inherit;border-top-width:1px}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}img{border-style:solid}input::placeholder{opacity:1;color:#9ca3af}input::webkit-input-placeholder{opacity:1;color:#9ca3af}input::-moz-placeholder{opacity:1;color:#9ca3af}input:-ms-input-placeholder{opacity:1;color:#9ca3af}input::-ms-input-placeholder{opacity:1;color:#9ca3af}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}legend{padding:0}ol,ul{list-style:none;margin:0;padding:0}progress{vertical-align:baseline}pre,code,kbd,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}summary{display:list-item}table{text-indent:0;border-color:inherit;border-collapse:collapse}textarea{resize:vertical}textarea::placeholder{opacity:1;color:#9ca3af}textarea::webkit-input-placeholder{opacity:1;color:#9ca3af}textarea::-moz-placeholder{opacity:1;color:#9ca3af}textarea:-ms-input-placeholder{opacity:1;color:#9ca3af}textarea::-ms-input-placeholder{opacity:1;color:#9ca3af}@keyframes enter-x-animation{to{opacity:1;transform:translate(0)}}@keyframes enter-y-animation{to{opacity:1;transform:translateY(0)}}.inline-block{display:inline-block}.flex{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.table{display:table}\n')();
if (typeof window !== "undefined") {
  let loadSvg = function() {
    let body = document.body;
    let svgDom = document.getElementById("__svg__icons__dom__1687683621629__");
    if (!svgDom) {
      svgDom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgDom.style.position = "absolute";
      svgDom.style.width = "0";
      svgDom.style.height = "0";
      svgDom.id = "__svg__icons__dom__1687683621629__";
    }
    svgDom.innerHTML = '<symbol class="arrow-more_svg__icon" viewBox="0 0 1450 1024" id="icon-arrow-more"><path fill="currentColor" d="M1390.933 546.133 972.8 964.267c-17.067 17.066-51.2 17.066-68.267 0L896 955.733c-17.067-17.066-17.067-51.2 0-68.266l324.267-332.8H76.8c-25.6 0-42.667-17.067-42.667-42.667v-8.533c0-25.6 17.067-42.667 42.667-42.667h1160.533L896 119.467c-17.067-17.067-17.067-51.2 0-68.267l8.533-8.533c17.067-17.067 51.2-17.067 68.267 0L1390.933 460.8c8.534 8.533 8.534 17.067 17.067 25.6v8.533c0 34.134-8.533 42.667-17.067 51.2z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-bilibili"><path d="M509.504.8a508.448 508.448 0 1 0 0 1016.96 508.448 508.448 0 0 0 0-1016.96z" fill="#FF509B" /><path d="M169.376 334.016c0 34.304 0 68.32.544 102.528.384 17.824.96 35.616 2.368 53.44 1.536 21.248 3.872 42.88 5.76 64.544 0 .96.64 1.792.64 2.368 7.36-.384 14.528-.96 21.632-.96 30.4-.832 60.128 3.296 88.64 14.496 13.888 5.6 27.456 12.032 39.392 21.056 9.92 7.52 12.224 16.8 6.88 30.464a40.9 40.9 0 0 1-15.456 20.352c-16.864 13.312-34.24 24.96-54.56 31.68a263.04 263.04 0 0 1-43.712 10.688c-19.328 2.88-39.04 4.256-58.752 6.176-4.064.64-7.968 0-12.224 0-1.92 0-2.56-.96-2.56-2.88-.16-8.704-.96-17.792-1.504-26.88a972.054 972.054 0 0 0-3.52-34.56l-5.696-48.128c-1.984-16.992-4.32-33.856-6.24-50.688-1.92-16.672-3.52-33.088-5.76-49.568-2.752-18.752-5.312-37.312-8.16-56.416a506.784 506.784 0 0 0-12.928-65.92c-.384-.96.576-2.88 1.152-3.52A2543.904 2543.904 0 0 0 162.56 329.6c6.176-2.72 6.816-3.68 6.816 4.48v-.096zm409.952 0c0 34.304 0 68.32.576 102.528.384 17.824.96 35.616 2.368 53.44 1.536 21.248 3.872 42.88 5.76 64.544 0 .96.64 1.792.64 2.368 7.36-.384 14.528-.96 21.632-.96 30.4-.832 60.128 3.296 88.64 14.496 13.888 5.6 27.392 12.032 39.392 21.056 10.048 7.52 12.288 16.8 6.72 30.336-2.88 8.224-8.256 15.36-15.424 20.288-16.864 13.376-34.272 24.96-54.56 31.744a263.04 263.04 0 0 1-43.712 10.624c-19.392 2.912-39.104 4.32-58.816 6.24-4 .576-7.968 0-12.224 0-1.92 0-2.56-.96-2.56-2.88-.16-8.704-.864-17.792-1.44-26.88a968.033 968.033 0 0 0-3.52-34.624l-5.76-48.064c-1.92-17.056-4.256-33.92-6.176-50.752-1.92-16.64-3.52-33.088-5.856-49.504-2.72-18.752-5.216-37.312-8.064-56.48a506.784 506.784 0 0 0-12.992-65.888c-.192-1.024.832-2.912 1.344-3.296 19.072-7.36 38.176-14.88 57.248-22.72 6.24-2.72 6.784-3.68 6.784 4.48v-.096zM468.48 517.024c10.112 0 20.352.192 30.4.64 2.56 0 3.872 1.92 3.872 4.16.256 5.312.64 10.144.64 15.36 0 23.584-.384 47.616 0 71.168.32 19.072.96 37.76 1.28 56.864 0 .96 0 2.336.384 4.448-10.816-.064-21.696.256-31.936-.064-.96 0-2.56-1.6-2.56-2.56-1.44-16.832-2.784-33.6-4.352-50.432l-4.288-46.816c-1.28-15.904-2.848-32-4.256-48.128 0-.96 0-1.92-.384-3.328a52.758 52.758 0 0 1 11.2-1.312zm410.048 0c10.112 0 20.352.192 30.4.64 2.56 0 3.872 1.92 3.872 4.16.256 5.312.64 10.144.64 15.36 0 23.584-.384 47.616 0 71.168.384 19.072.96 37.76 1.28 56.864 0 .96 0 2.336.384 4.448-10.816-.064-21.696.256-31.936-.064-.96 0-2.56-1.6-2.56-2.56-1.44-16.832-2.784-33.6-4.384-50.432l-4.256-46.816c-1.28-15.904-2.88-32-4.256-48.128 0-.96 0-1.92-.384-3.328a52.758 52.758 0 0 1 11.2-1.312zm-501.056-1.408c1.152 7.744 2.56 15.456 3.424 23.584 1.792 13.248 2.88 26.56 4.256 39.68 1.344 11.648 2.56 23.04 3.968 34.624 1.28 12.192 2.88 24.544 4.448 37.28.32 3.488.896 7.36 1.28 11.2-11.264 1.376-22.272 2.72-33.92 4.288a18171.84 18171.84 0 0 1-29.376-149.888c8.064-.96 15.904-2.368 23.584-3.328 5.6-.8 11.456-.8 16.864-1.312 3.104-.384 5.024.96 5.44 3.84zm410.048 0c1.216 7.744 2.56 15.456 3.424 23.584 1.792 13.248 2.944 26.56 4.32 39.68l3.84 34.624 4.448 37.28c.384 3.488.96 7.36 1.312 11.2-11.232 1.376-22.24 2.72-33.888 4.288A15618.016 15618.016 0 0 1 741.6 516.384c8.064-.96 15.904-2.368 23.68-3.328 5.568-.8 11.36-.8 16.768-1.312 3.104-.384 5.024.96 5.44 3.84zm-363.2-140.16 2.88 43.68c1.28 19.712 2.88 39.424 4.256 59.136.96 14.304 1.536 28.448 2.88 42.816 1.344 15.648 2.88 31.168 4.256 46.56 1.344 11.2 2.368 23.04 3.296 34.24 1.344 12.16 2.752 24.576 3.52 37.312l.96 10.624c.032 1.92-.896 2.272-2.816 1.92-10.048-.96-19.712-1.536-30.4-2.496-9.088-91.84-16.864-184.448-34.24-276.992l17.184-1.92 20.16-1.28c5.6-.416 7.68.896 8.096 6.4zm410.016 0 2.88 43.68c1.248 19.712 2.848 39.424 4.224 59.136.96 14.304 1.6 28.448 2.88 42.816 1.312 15.648 2.88 31.168 4.32 46.56 1.28 11.2 2.272 23.04 3.296 34.24 1.28 12.16 2.688 24.576 3.456 37.312l.96 10.624c.096 1.92-.832 2.272-2.816 1.92-10.112-.96-19.712-1.536-30.4-2.496-9.088-91.84-16.864-184.448-34.24-276.992l17.184-1.92 20.16-1.28c5.6-.416 7.68.896 8.096 6.4zm-364.16 66.752v.128c2.56 0 3.456.576 3.456 3.456-.384 7.744 0 15.872 0 23.584v29.376c-5.76.64-11.008.96-16.224 1.28-1.6-18.688-2.912-37.664-4.448-57.824h17.248zm410.08 0v.128c2.56 0 3.424.576 3.424 3.456-.384 7.744 0 15.872 0 23.584v29.376c-5.76.64-11.008.96-16.224 1.28-1.6-18.688-2.912-37.664-4.448-57.824h17.248zm-382.784.256c2.88 0 4.288.96 4.288 4.48v52.96l-20.992-.96V442.56h16.704v-.064zm410.048 0c2.88 0 4.288.96 4.288 4.48v52.96l-20.992-.96V442.56h16.704v-.064zm-569.408-3.232c2.72-.384 1.92 1.92 2.336 3.424l1.92 19.136c.96 10.112 2.336 19.744 3.296 29.856v3.84l-15.648 2.752c-3.52-18.752-6.816-37.312-10.24-56.48 6.176-.64 12.096-2.016 18.336-2.56zm410.048 0c2.72-.384 1.92 1.92 2.336 3.424l1.92 19.136c.96 10.112 2.336 19.744 3.296 29.856v3.84l-15.648 2.752c-3.52-18.752-6.816-37.312-10.24-56.48 6.08-.64 12.096-2.016 18.336-2.56zm-382.656-3.136c1.92 0 2.944 1.216 3.392 3.52 1.696 17.792 3.296 35.168 5.216 53.536-6.816.832-13.184.96-20.352 1.536l-7.328-58.208c6.624-.384 12.896-.384 19.072-.384zm410.112 0c1.92 0 2.88 1.216 3.296 3.52 1.728 17.792 3.328 35.168 5.216 53.536-6.784.832-13.152.96-20.352 1.536l-7.296-58.208c6.56-.384 12.896-.384 19.072-.384h.064z" fill="#FFF" /><path d="M208.096 592.256c2.912 20.864 5.856 41.92 8.704 63.616 17.824-13.376 34.784-26.464 52.032-39.456-2.272-2.912-49.536-21.696-60.736-24.16zm410.112 0c2.88 20.864 5.76 41.92 8.64 63.616 17.824-13.376 34.784-26.464 52.032-39.456-2.304-2.912-49.472-21.696-60.672-24.16z" fill="#F66E98" /></symbol><symbol class="icon" viewBox="0 0 1205 1024" xmlns="http://www.w3.org/2000/svg" id="icon-check_0"><path d="m468.52 884.114-85.185 85.185L0 585.964l170.371-170.37 212.964 212.963 596.3-596.299 170.37 170.371-681.484 681.485Z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-check_1"><path fill="#333" d="M256 426.667 170.667 512l256 256 426.666-426.667L768 256 426.667 597.333z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-check_2"><path fill="#333" d="M1002.88 321.92 405.76 935.04a32 32 0 0 1-45.76 0L21.12 612.48a32 32 0 0 1 0-44.8L160 433.6a32 32 0 0 1 45.76 0L359.04 576l437.12-455.36a32 32 0 0 1 46.08 0l160 156.48a32 32 0 0 1 .64 44.8z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-douyin"><path d="M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512Z" fill="#FE0049" /><path d="M459.404 797.79A173.15 173.15 0 0 1 286.72 625.104a168.96 168.96 0 0 1 193.164-173.614v81.92A101.47 101.47 0 0 0 368.64 626.5a90.764 90.764 0 0 0 181.527 0V228.074h71.68a282.996 282.996 0 0 0 115.898 83.782l-4.654 81.92a200.61 200.61 0 0 1-100.538-46.546v279.273a173.15 173.15 0 0 1-173.15 171.287z" fill="#FFF" /></symbol><symbol class="backdrop" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" id="icon-icons-circle"><circle cx="40" cy="42" r="14" transform="translate(-26 -28)" /></symbol><symbol class="backdrop" viewBox="0 0 24 27" xmlns="http://www.w3.org/2000/svg" id="icon-icons-hexagon"><path d="M12.016 27a4.387 4.387 0 0 1-2.298-.642l-7.42-4.395A4.755 4.755 0 0 1 0 17.907V9.085c0-1.69.886-3.246 2.298-4.057L9.718.634a4.424 4.424 0 0 1 4.564 0l7.42 4.394A4.755 4.755 0 0 1 24 9.085v8.788c0 1.69-.886 3.245-2.298 4.057l-7.387 4.428c-.723.44-1.51.642-2.299.642z" /></symbol><symbol class="backdrop" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" id="icon-icons-rounded"><path d="M14 0c2.009 0 4.019.126 6.029.378a8.75 8.75 0 0 1 7.593 7.594 48.394 48.394 0 0 1 0 12.057 8.75 8.75 0 0 1-7.594 7.593 48.417 48.417 0 0 1-12.057 0A8.75 8.75 0 0 1 .38 20.029 48.032 48.032 0 0 1 .378 7.971 8.75 8.75 0 0 1 7.971.38C9.971.127 11.984 0 14 0z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-quote-left"><path d="M928 512H768V384c0-70.6 57.4-128 128-128h16c26.6 0 48-21.4 48-48v-96c0-26.6-21.4-48-48-48h-16c-176.8 0-320 143.2-320 320v480c0 53 43 96 96 96h256c53 0 96-43 96-96V608c0-53-43-96-96-96zm-576 0H192V384c0-70.6 57.4-128 128-128h16c26.6 0 48-21.4 48-48v-96c0-26.6-21.4-48-48-48h-16C143.2 64 0 207.2 0 384v480c0 53 43 96 96 96h256c53 0 96-43 96-96V608c0-53-43-96-96-96z" /></symbol><symbol class="search_svg__icon" viewBox="0 0 1024 1024" id="icon-search"><path fill="currentColor" d="m769.13 673.493 144.683 144.683a21.333 21.333 0 0 1 0 30.165l-36.202 36.203a21.333 21.333 0 0 1-30.166 0L706.56 743.68A361.259 361.259 0 0 1 469.333 832c-200.298 0-362.666-162.368-362.666-362.667s162.368-362.666 362.666-362.666S832 269.035 832 469.333c0 75.712-23.19 146.006-62.87 204.16zM469.334 742.4C620.16 742.4 742.4 620.16 742.4 469.333S620.16 196.267 469.333 196.267s-273.066 122.24-273.066 273.066S318.507 742.4 469.333 742.4z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-souhu"><path d="M515.3 64.8c-247.2 0-447.5 200.4-447.5 447.5s200.3 447.5 447.5 447.5 447.5-200.3 447.5-447.5S762.4 64.8 515.3 64.8zm-60.9 521.3a6.1 6.1 0 0 1-.7-1s-75.4-182.7-325.9-166.7c0 0 288.9-422.7 527.5 8.5l.2.5c4.7 12.3 97.7 254.3 247.2 253.7 0 0-185.7 303.4-448.3-95z" fill="#F1CA00" /><path d="M655.5 427.4c-10.4-1.4-80.1-11.3-109.5-32.7 0 0 23.6 76.7 15.8 120.4 0 0-42.5-6.2-101.5-40.5 0 0 4.5 26.8-5.9 111.5 262.6 398.4 448.3 95 448.3 95-149.5.6-242.5-241.4-247.2-253.7z" fill="#E70204" /><path d="M460.3 474.6c59 34.3 101.5 40.5 101.5 40.5 7.8-43.7-15.8-120.4-15.8-120.4 29.4 21.4 99.1 31.3 109.5 32.7l-.2-.5c-238.6-431.2-527.5-8.5-527.5-8.5 250.5-16 325.9 166.7 325.9 166.7a6.1 6.1 0 0 0 .7 1c10.4-84.7 5.9-111.5 5.9-111.5z" fill="#090504" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-toutiao"><path d="M224 70.4c-83.2 0-153.6 70.4-153.6 153.6v576c0 83.2 70.4 153.6 153.6 153.6h576c83.2 0 153.6-70.4 153.6-153.6V224c0-83.2-70.4-153.6-153.6-153.6H224zM800 960H224c-89.6 0-160-70.4-160-160V224c0-89.6 70.4-160 160-160h576c89.6 0 160 70.4 160 160v576c0 89.6-70.4 160-160 160z" fill="#DBDCDC" /><path d="M224 70.4c-83.2 0-153.6 70.4-153.6 153.6v576c0 83.2 70.4 153.6 153.6 153.6h576c83.2 0 153.6-70.4 153.6-153.6V224c0-83.2-70.4-153.6-153.6-153.6H224z" fill="#FFF" /><path d="M364.8 166.4c0-6.4-6.4-6.4-6.4-6.4h-12.8v25.6h6.4v-12.8c0-6.4 6.4-6.4 6.4-6.4s0 6.4 6.4 0l-6.4 19.2h6.4v-19.2c0 6.4 0 0 0 0zm-38.4 12.8c-6.4 0-6.4-6.4-6.4-6.4s0-6.4 6.4-6.4 6.4 6.4 6.4 6.4 0 6.4-6.4 6.4zm12.8-19.2h-12.8c-6.4 0-12.8 6.4-12.8 12.8v6.4c0 6.4 6.4 12.8 12.8 12.8h12.8v-32zm-70.4 6.4s6.4 0 0 0zm6.4 6.4c6.4 0 6.4 0 0 0 0-6.4 0-12.8-6.4-12.8s-12.8 6.4-12.8 12.8 6.4 12.8 12.8 12.8 6.4-6.4 6.4-12.8c0 6.4-6.4 6.4-6.4 6.4-6.4 0-6.4-6.4-6.4-6.4h12.8zm128-6.4s6.4 0 0 0-6.4 0 0 0zm6.4 6.4c6.4 0 6.4 0 0 0 0-6.4 0-12.8-6.4-12.8s-12.8 6.4-12.8 12.8 6.4 12.8 12.8 12.8 6.4-6.4 6.4-12.8c0 6.4-6.4 6.4-6.4 6.4-6.4 0-6.4-6.4-6.4-6.4h12.8zm-25.6 6.4s-6.4 0 0 0c-12.8 6.4-12.8 0-12.8 0s0-6.4 6.4-6.4c0-6.4 6.4-6.4 6.4 6.4 6.4-12.8 0-12.8-6.4-12.8s-12.8 6.4-12.8 12.8v6.4c0 6.4 6.4 12.8 12.8 12.8 6.4-12.8 12.8-19.2 6.4-19.2zm-89.6 0c6.4 0 6.4 0 0 0 6.4 0 6.4 0 0 0 6.4 0 6.4-6.4 6.4-6.4V153.6H288l6.4 25.6zm0-25.6c6.4 0 6.4 0 0 0 6.4 0 6.4 0 12.8 6.4v25.6l-6.4 6.4h-19.2v-38.4h12.8zM256 160l-6.4 6.4v19.2-19.2h-12.8V160h12.8v6.4h6.4zm-32 32h-6.4v-6.4l6.4 6.4c-6.4-6.4 0-6.4 0 0v-6.4L211.2 160h6.4l6.4 12.8 6.4-12.8h6.4L224 192zm-25.6-12.8c6.4 0 6.4 0 0 0 6.4 0 6.4 0 0 0 6.4 0 6.4 0 0 0 6.4 0 6.4 0 0 0l6.4-6.4H192v6.4h6.4zm0-12.8c6.4 0 6.4 0 0 0 6.4 0 6.4 0 0 0 6.4-6.4 6.4-6.4 0 0 6.4-6.4 6.4-6.4 0-6.4H192v6.4h6.4zm6.4-12.8h6.4v12.8h-6.4 6.4v6.4h-25.6v-19.2h19.2zm460.8 620.8h172.8v-25.6H665.6v25.6zm0 96h172.8v-25.6H665.6v25.6zm0-51.2h172.8v-25.6H665.6v25.6zm-480-44.8h448v-25.6h-448v25.6zm0 96h448v-25.6h-448v25.6zm0-51.2h448v-25.6h-448v25.6zm256-640h192v-25.6h-192v25.6zm0 96h192v-25.6h-192v25.6zm0-51.2h192v-25.6h-192V224zm224-44.8h172.8v-25.6H665.6v25.6zm0 96h172.8v-25.6H665.6v25.6zm0-51.2h172.8v-25.6H665.6V224zm-454.4 6.4c0-6.4 6.4-12.8 12.8-19.2 6.4 0 12.8 0 19.2 6.4 12.8 6.4 12.8 12.8 6.4 19.2 0 6.4-12.8 12.8-19.2 12.8-6.4 0-19.2-6.4-19.2-19.2zm32 89.6 57.6-83.2 25.6 32 32-57.6 51.2 102.4V198.4h-224V352H416v-32H243.2z" fill="#DBDCDC" /><path d="M64 256v556.8l896-51.2V211.2L64 256z" fill="#E62318" /><path d="M864 569.6v-44.8l-134.4 12.8V512l-64 6.4v19.2L531.2 544v44.8l134.4-6.4V672h64v-96z" fill="#FFF" /><path d="m307.2 428.8-51.2-64-70.4 6.4 51.2 64 70.4-6.4zm0 83.2L256 448l-70.4 6.4 51.2 64 70.4-6.4zm70.4 76.8 51.2 102.4 70.4-6.4L448 582.4l-70.4 6.4zm153.6 96 64-6.4 44.8-83.2-64 6.4-44.8 83.2zm294.4-102.4-64 6.4 44.8 76.8 64-6.4-44.8-76.8zm-294.4-89.6v44.8H576L697.6 480l121.6 44.8H864v-51.2h-32l-83.2-32 108.8-51.2V320l-64 6.4-147.2 6.4-51.2-25.6-64 102.4 57.6 19.2 32-57.6L800 358.4v12.8l-96 51.2-83.2-25.6-25.6 38.4 44.8 19.2-76.8 32-32 6.4z" fill="#FFF" /><path d="m371.2 576 121.6-6.4v-44.8l-83.2 6.4V345.6h-64v185.6L160 544v44.8l128-6.4-57.6 76.8H160V704l121.6-6.4z" fill="#FFF" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-weibo"><path fill="#f1b40c" d="M438.33 583.68a16.65 16.65 0 0 0-4.714 21.585 13.113 13.113 0 0 0 19.449 1.768 17.607 17.607 0 0 0 5.893-21.585 13.702 13.702 0 0 0-20.627-1.768zm-53.704 14.734a40.665 40.665 0 0 0-36.319 38.308c0 17.754 17.018 29.983 38.235 27.478s38.307-18.712 38.307-36.319-15.986-31.972-40.223-29.688zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zm230.437 631.712c-46.264 98.643-199.717 146.749-313.241 138.13-107.925-8.472-246.644-44.202-261.01-174.89 0 0-7.366-58.936 49.8-135.7 0 0 82.436-115.217 178.5-148.074s107.337 22.69 107.337 55.326c-5.083 27.773-14.734 44.201 21.437 32.93 0 0 94.518-44.202 133.415-4.936 31.383 31.383 5.157 74.553 5.157 74.553s-12.966 14.734 13.776 19.596 111.314 44.128 64.829 143.065zm-93.265-272.575a18.638 18.638 0 0 1 0-37.277s115.808-21.438 102.031 103.137a6.483 6.483 0 0 1 0 1.989 18.417 18.417 0 0 1-18.196 15.397 18.712 18.712 0 0 1-18.933-18.786s18.344-82.951-64.829-64.534zm195.886 88.77c-3.094 21.291-13.482 28.069-26.005 28.069-14.734 0-26.963-4.126-26.963-19.007a79.342 79.342 0 0 1 5.23-26.005c1.547-5.378 14.145-39.266-8.324-89.729-41.181-69.175-124.133-70.28-133.93-66.302a123.47 123.47 0 0 1-24.459 5.746 27.184 27.184 0 0 1-27.036-27.184 27.552 27.552 0 0 1 19.743-26.52 1.915 1.915 0 0 1 .663-1.18 30.425 30.425 0 0 1 2.578-2.43c11.566-2.21 52.747-12.966 92.823-3.61 71.607 16.796 169.955 100.263 125.68 228.153zm-407.464 17.46c-112.713 5.157-203.842 65.566-203.842 140.856s91.129 131.72 203.842 126.784 204.064-76.026 204.064-151.242-91.276-121.333-204.064-116.398zm76.837 189.404c-34.477 44.201-103.137 66.302-169.439 30.425a58.935 58.935 0 0 1-30.425-50.758s-12.819-106.23 100.558-119.491 133.71 95.254 99.306 139.824z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-weixin"><path fill="#0cce36" d="M579.52 512a24.64 24.64 0 0 0-23.36 24.32 24.32 24.32 0 0 0 23.36 21.76c17.6 0 30.08-10.88 30.08-21.76A26.88 26.88 0 0 0 579.52 512zm-76.8-112.64a27.84 27.84 0 0 0 30.08-29.12 27.52 27.52 0 0 0-30.08-29.12 32 32 0 0 0-34.24 29.12 32 32 0 0 0 34.24 28.8zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zm-96 641.6a275.84 275.84 0 0 1-82.56-13.44L248.32 672l24.32-71.68a192 192 0 0 1-94.4-160c0-113.6 106.88-200.32 236.8-200.32 115.2 0 217.6 68.48 237.76 165.12a116.16 116.16 0 0 0-22.4-2.56A193.92 193.92 0 0 0 429.44 590.4a200.96 200.96 0 0 0 6.72 49.6 174.4 174.4 0 0 1-20.16 1.6zm347.84 81.6 16.64 60.16-64-35.84A359.36 359.36 0 0 1 644.8 760c-111.68 0-200.32-76.8-200.32-171.84S532.8 416 644.48 416c105.92 0 200.96 76.8 200.96 171.84a176.96 176.96 0 0 1-82.24 135.68zm-425.28-384a32 32 0 0 0-35.84 29.12 32 32 0 0 0 35.84 29.12 28.8 28.8 0 0 0 30.08-29.12 28.16 28.16 0 0 0-31.04-27.84zM710.4 512a24 24 0 0 0-23.36 24.32 23.68 23.68 0 0 0 23.36 21.76 26.88 26.88 0 0 0 29.12-21.76A26.56 26.56 0 0 0 710.4 512z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="icon-zhihu"><path fill="#0463f1" d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM382.132 267.522s-36.222 2.104-48.98 24.49-54.32 137.364-54.32 137.364 13.837 6.366 37.275-10.653a92.067 92.067 0 0 0 30.882-46.85l42.588-2.13 1.078 121.397s-73.496-1.078-88.41 0-23.412 40.457-23.412 40.457h111.822a371.505 371.505 0 0 1-38.352 116.084 332.916 332.916 0 0 1-83.072 87.333 95.014 95.014 0 0 0 77.732-6.393c38.352-22.332 66.63-120.687 66.63-120.687l89.937 110.06s8.18-52.4-1.473-67.183-62.212-74.285-62.212-74.285l-22.937 20.255 16.335-65.105h97.96s0-38.353-19.15-40.483-78.915 0-78.915 0V371.9h88.384s-1.078-39.458-18.097-39.458H359.773l22.333-64.947zm169.983 61.29V687.27h36.012l13.152 45.008 63.342-45.008h89.016V328.812H552.115z" /><path fill="#0463f1" d="M594.782 368.638H712.68v277.78h-41.878l-53.373 40.273-11.626-40.273h-10.996z" /></symbol>';
    body.insertBefore(svgDom, body.firstChild);
  };
  if (document.readyState === "interactive") {
    document.addEventListener("DOMContentLoaded", loadSvg);
  } else {
    loadSvg();
  }
}
var style = /* @__PURE__ */ (() => ".section{position:relative;display:flex;flex-direction:column;padding:50px 0;overflow:hidden;justify-content:center;max-width:100vw}.wr{position:relative;width:100%;margin:0 auto;padding:0 30px;box-sizing:border-box;z-index:0}\n")();
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".btn-rows button[data-v-4e7ee71a]{margin-right:12px}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const FILE_TYPES = [
  { type: "application/pdf", name: "PDF", suffix: ".pdf" },
  { type: "image/jpeg", name: "JPEG,JPG", suffix: ".jpg" },
  { type: "image/png", name: "PNG", suffix: ".png" },
  { type: "image/gif", name: "GIF", suffix: ".gif" },
  { type: "application/msword", name: "DOC", suffix: ".doc" },
  { type: "image/svg+xml", name: "SVG" },
  { type: "application/vnd.ms-excel", name: "XLS", suffix: ".xls" },
  { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", name: "DOCX", suffix: "docx" },
  { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", name: "XLSX", suffix: ".xlsx" },
  { type: "application/zip", name: "ZIP", suffix: ".zip" },
  { type: "application/x-rar", name: "RAR", suffix: ".rar" }
];
const IMG_TYPES = [
  { type: "image/jpeg", name: "JPEG,JPG", suffix: ".jpg" },
  { type: "image/png", name: "PNG", suffix: ".png" },
  { type: "image/gif", name: "GIF", suffix: ".gif" },
  { type: "image/svg+xml", name: "SVG" }
];
const getFileName = (url) => {
  if (url && url.startsWith("#")) {
    return "...";
  }
  const extIndex = url.lastIndexOf(".");
  const fileExt = url.substring(extIndex + 1);
  const file1 = url.substring(url.lastIndexOf("/") + 1, extIndex);
  const file2 = file1.substring(file1.indexOf("_") + 1);
  return `${file2}.${fileExt}`;
};
const _sfc_main$6 = defineComponent({
  name: "SetUpload",
  components: {
    [Alert.name]: Alert,
    [Upload.name]: Upload,
    [Modal.name]: Modal,
    [Tooltip.name]: Tooltip,
    UploadOutlined,
    PlusOutlined,
    LoadingOutlined,
    UserOutlined
  },
  props: {
    type: {
      type: String,
      default() {
        return "file";
      }
    },
    libraryId: {
      type: String,
      default() {
        return void 0;
      }
    },
    fileUrl: {
      type: String,
      default() {
        return void 0;
      }
    },
    dataList: {
      type: Array,
      default() {
        return [];
      }
    },
    limit: {
      type: Number,
      default() {
        return 1;
      }
    },
    accept: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default() {
        return true;
      }
    },
    btnTxt: {
      type: String,
      default() {
        return void 0;
      }
    },
    hideFiles: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  setup(props, context) {
    const requestMethod = inject("mix-cms-request-method");
    const uploadMethod = inject("mix-upload-method");
    const imageUrl = ref(props.fileUrl);
    let files = [];
    if (props.dataList && props.dataList.length > 0) {
      files = [...props.dataList.map((xx) => {
        return {
          name: getFileName(xx),
          status: "done",
          url: xx
        };
      })];
    } else {
      if (props.fileUrl) {
        files = [{ name: getFileName(props.fileUrl), status: "done", url: props.fileUrl }];
      }
    }
    const fileLst = ref(files);
    const loading = ref(false);
    const handleChange = (info) => {
      console.log("handleChange--------------------------------->", info);
      if (info.file.status !== "uploading") {
        console.log("handleChange  uploading ", info.file, info.fileList);
      }
      if (info.file.status === "done")
        ;
      else if (info.file.status === "error") {
        message.error(`${info.file.name} \u6587\u4EF6\u4E0A\u4F20\u5931\u8D25`);
        info.fileList.pop();
        fileLst.value = info.fileList;
        context.emit("onChange", info.file, fileLst.value, "delete");
      } else if (info.file.status === "removed") {
        fileLst.value = info.fileList;
        context.emit("onChange", info.file, fileLst.value, "delete");
        if (props.limit <= 1) {
          imageUrl.value = null;
        }
      }
    };
    const beforeUpload = (file, fileList) => {
      console.log("beforeUpload=====> ", file, fileList);
      let isLimitAccept = true;
      if (props.limit > 1 && fileLst.value.length >= props.limit) {
        message.warning("\u6587\u4EF6\u6570\u91CF\u8D85\u8FC7\u4E0A\u9650");
        isLimitAccept = false;
      }
      let isFileAccept = true;
      if (props.accept.length > 0) {
        const findFileType = !props.accept || props.accept.find((XX) => XX.type === file.type);
        if (!findFileType) {
          const text = props.accept.map((item) => item.name);
          message.error(`\u53EA\u80FD\u4E0A\u4F20${text}`, 5);
          isFileAccept = false;
        }
      } else {
        const accepts = props.type === "image" || props.type === "avatar" ? [...IMG_TYPES] : [...FILE_TYPES];
        const findFileType = accepts.find((XX) => XX.type === file.type);
        if (!findFileType) {
          const text = accepts.map((item) => item.name);
          message.error(`\u53EA\u80FD\u4E0A\u4F20${text}`, 5);
          isFileAccept = false;
        }
      }
      const result = isLimitAccept && isFileAccept;
      if (!result) {
        fileList.pop();
      }
      return result;
    };
    const handleUpload = (params) => {
      console.log("handleUpload=====> custom-request \u89E6\u53D1 ", params);
      const { file } = params;
      loading.value = true;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadMethod({ file, type: props.type === "image" ? "Media" : "Attachment", libraryId: props.libraryId }, requestMethod).then((ret) => {
          console.log("oss Upload=====> ", ret);
          if (props.limit <= 1) {
            imageUrl.value = ret.filePath;
            file.url = ret.filePath;
            fileLst.value = [file];
          } else {
            file.url = ret.filePath;
            const newFileList = [];
            fileLst.value.forEach((xx) => {
              if (xx.uid === file.uid) {
                newFileList.push({ ...file });
              } else {
                newFileList.push({ ...xx });
              }
            });
            fileLst.value = [...newFileList];
          }
          context.emit("onChange", { ...file, ...ret }, fileLst.value, "add");
          loading.value = false;
        }).catch((e) => {
          console.log("oss Upload=====> catch ", e);
          loading.value = false;
          fileLst.value.pop();
          context.emit("onChange", file, fileLst.value, "delete");
        });
      };
    };
    watch(
      () => props.fileUrl,
      (val, prevVal) => {
        if (val) {
          fileLst.value = [{ name: getFileName(val), status: "done", url: val }];
        } else {
          fileLst.value = [];
        }
      }
    );
    watch(
      () => props.dataList,
      (val, prevVal) => {
        if (val && val.length > 0) {
          fileLst.value = [...val.map((xx) => {
            return {
              name: getFileName(xx),
              status: "done",
              url: xx
            };
          })];
        } else {
          fileLst.value = [];
        }
      }
    );
    return {
      loading,
      imageUrl,
      fileLst,
      handleChange,
      beforeUpload,
      handleUpload,
      IMG_TYPES,
      FILE_TYPES
    };
  },
  methods: {
    handlePreview(file) {
      const initialViewIndex = this.fileLst.indexOf(file);
      this.$viewerApi({
        images: this.fileLst.map((xx) => xx.url),
        options: {
          initialViewIndex
        }
      });
    }
  }
});
const _hoisted_1$4 = { key: 0 };
const _hoisted_2$3 = {
  key: 0,
  class: "ant-upload-text"
};
const _hoisted_3$3 = {
  key: 1,
  class: "ant-upload-text"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LoadingOutlined = resolveComponent("LoadingOutlined");
  const _component_a_avatar = resolveComponent("a-avatar");
  const _component_UserOutlined = resolveComponent("UserOutlined");
  const _component_a_upload = resolveComponent("a-upload");
  const _component_PlusOutlined = resolveComponent("PlusOutlined");
  const _component_upload_outlined = resolveComponent("upload-outlined");
  const _component_a_button = resolveComponent("a-button");
  return openBlock(), createElementBlock("div", null, [
    _ctx.type === "avatar" ? (openBlock(), createBlock(_component_a_upload, {
      key: 0,
      accept: _ctx.IMG_TYPES.map((xx) => xx.suffix).join(","),
      "before-upload": _ctx.beforeUpload,
      onPreview: _ctx.handlePreview,
      onChange: _ctx.handleChange,
      "custom-request": _ctx.handleUpload,
      showUploadList: false
    }, {
      default: withCtx(() => {
        var _a;
        return [
          _ctx.loading ? (openBlock(), createBlock(_component_a_avatar, {
            key: 0,
            size: 45
          }, {
            icon: withCtx(() => [
              createVNode(_component_LoadingOutlined)
            ]),
            _: 1
          })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            ((_a = _ctx.fileLst) == null ? void 0 : _a.length) > 0 ? (openBlock(), createBlock(_component_a_avatar, {
              key: 0,
              size: 45,
              src: _ctx.fileLst[0].url
            }, null, 8, ["src"])) : (openBlock(), createBlock(_component_a_avatar, {
              key: 1,
              size: 45
            }, {
              icon: withCtx(() => [
                createVNode(_component_UserOutlined)
              ]),
              _: 1
            }))
          ], 64))
        ];
      }),
      _: 1
    }, 8, ["accept", "before-upload", "onPreview", "onChange", "custom-request"])) : _ctx.type === "image" ? (openBlock(), createBlock(_component_a_upload, {
      key: 1,
      "list-type": "picture-card",
      multiple: _ctx.limit > 1,
      accept: _ctx.IMG_TYPES.map((xx) => xx.suffix).join(","),
      action: "#",
      "before-upload": _ctx.beforeUpload,
      "show-upload-list": { showPreviewIcon: true, showRemoveIcon: _ctx.isEdit },
      onPreview: _ctx.handlePreview,
      onChange: _ctx.handleChange,
      "custom-request": _ctx.handleUpload,
      showUploadList: !_ctx.hideFiles,
      "file-list": _ctx.fileLst,
      "onUpdate:file-list": _cache[0] || (_cache[0] = ($event) => _ctx.fileLst = $event)
    }, {
      default: withCtx(() => [
        _ctx.fileLst.length < _ctx.limit && _ctx.isEdit ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
          _ctx.loading ? (openBlock(), createBlock(_component_LoadingOutlined, { key: 0 })) : (openBlock(), createBlock(_component_PlusOutlined, { key: 1 })),
          !_ctx.btnTxt ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_2$3, "\u6B63\u5728\u4E0A\u4F20")) : (openBlock(), createElementBlock("div", _hoisted_3$3, "\u4E0A\u4F20"))
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
            createTextVNode(toDisplayString(_ctx.loading ? "" : _ctx.btnTxt), 1)
          ], 64))
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["multiple", "accept", "before-upload", "show-upload-list", "onPreview", "onChange", "custom-request", "showUploadList", "file-list"])) : (openBlock(), createBlock(_component_a_upload, {
      key: 2,
      name: "file",
      accept: _ctx.FILE_TYPES.map((xx) => xx.suffix).join(","),
      multiple: _ctx.limit > 1,
      "before-upload": _ctx.beforeUpload,
      action: "#",
      "show-upload-list": { showPreviewIcon: true, showRemoveIcon: _ctx.isEdit },
      onChange: _ctx.handleChange,
      "custom-request": _ctx.handleUpload,
      showUploadList: !_ctx.hideFiles,
      "file-list": _ctx.fileLst,
      "onUpdate:file-list": _cache[1] || (_cache[1] = ($event) => _ctx.fileLst = $event)
    }, {
      default: withCtx(() => [
        _ctx.isEdit && (_ctx.hideFiles || (_ctx.limit === 1 || _ctx.limit > _ctx.fileLst.length)) ? (openBlock(), createBlock(_component_a_button, { key: 0 }, {
          default: withCtx(() => [
            _ctx.loading ? (openBlock(), createBlock(_component_LoadingOutlined, { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createVNode(_component_upload_outlined),
              !_ctx.btnTxt ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(!_ctx.hideFiles && _ctx.limit === 1 && _ctx.fileLst.length > 0 ? "\u91CD\u65B0\u4E0A\u4F20" : "\u4E0A\u4F20"), 1)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(_ctx.loading ? "" : _ctx.btnTxt), 1)
              ], 64))
            ], 64))
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["accept", "multiple", "before-upload", "show-upload-list", "onChange", "custom-request", "showUploadList", "file-list"]))
  ]);
}
var SetUpload = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-4e7ee71a"]]);
var fieldTypeEdit_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".set-type-field_edit[data-v-44d251e3]{color:#9b9b9b}.set-type-field_edit .flexCheckRow[data-v-44d251e3]{padding:6px 0 0;flex-wrap:wrap}.set-type-field_edit .flexCheck[data-v-44d251e3]{display:flex;min-height:32px;flex-direction:row;white-space:normal}.set-type-field_edit .ant-radio-wrapper-checked[data-v-44d251e3]{color:#1890ff}.set-type-field_edit .wrapCheck[data-v-44d251e3]{display:flex;margin-bottom:6px}\n")();
const _sfc_main$5 = defineComponent({
  name: "SetFieldTypeEdit",
  components: { DeleteOutlined, PlusOutlined, FormOutlined, OssUpload: SetUpload },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    dynamicKey: {
      type: String,
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    optionDict: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["onValueChange"],
  setup(props, { emit }) {
    const getFieldValue = () => {
      return props.data[props.dynamicKey || props.field.model];
    };
    const fieldValue = ref(getFieldValue());
    const vValue = props.data[props.dynamicKey || props.field.model];
    const dynamicValue = ref(vValue !== null && vValue !== void 0 ? vValue : " ");
    const colStyle = computed(() => {
      const { field } = props;
      return {
        flex: `0 0 ${100 / field.colCount}%`,
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
      };
    });
    const getFieldStyle = computed(() => {
      var _a;
      const { field } = props;
      let width = "100%";
      const fieldWidth = (_a = field.params) == null ? void 0 : _a.width;
      if (fieldWidth) {
        console.log("----------------------------->fieldWidth", fieldWidth);
        width = fieldWidth;
        if (!isNaN(parseFloat(fieldWidth)) && isFinite(fieldWidth)) {
          console.log("----------------------------->parseFloat", fieldWidth);
          width = `${fieldWidth}px`;
        }
      }
      return { width };
    });
    const getOptions = (field, key) => {
      const { optionDict } = props;
      return field.options || (optionDict ? optionDict[key || field.model] || [] : []);
    };
    const otherValueChange = (event) => {
      const { field } = props;
      emit("onValueChange", field.model, event.target.value);
    };
    const handleValueChange = (event, key) => {
      const { field } = props;
      let value = event;
      if (field.type === "input" || field.type === "inputArea" || field.type === "number") {
        value = event.target.value;
      } else if (field.type === "radio") {
        value = event.target.value;
      }
      emit("onValueChange", key, value);
    };
    const handleSelectChange = (event, key) => {
      emit("onValueChange", key, event);
    };
    const handleUploadChange = (file, fileList, type) => {
      const { field } = props;
      if (type === "delete") {
        emit("onValueChange", field.model, "");
      } else if (type === "doing") {
        emit("onValueChange", field.model, file.url);
      } else {
        emit("onValueChange", field.model, file.url);
      }
    };
    const handleMultiUploadChange = (file, fileList, type) => {
      const { field } = props;
      const fileUrlList = fileList.map((xx) => xx.url);
      console.log("handleMultiUploadChange  ====> ", fileUrlList);
      emit("onValueChange", field.model, fileUrlList);
    };
    watchEffect(() => {
      console.log("SetFieldTypeEdit === >watchEffect ====> ", props.data, props.field.model);
      fieldValue.value = getFieldValue();
    });
    return {
      fieldValue,
      dynamicValue,
      colStyle,
      getFieldStyle,
      getOptions,
      handleValueChange,
      otherValueChange,
      handleSelectChange,
      handleUploadChange,
      handleMultiUploadChange
    };
  }
});
const _hoisted_1$3 = { class: "set-type-field_edit" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e;
  const _component_a_select_option = resolveComponent("a-select-option");
  const _component_a_select = resolveComponent("a-select");
  const _component_a_input = resolveComponent("a-input");
  const _component_a_textarea = resolveComponent("a-textarea");
  const _component_a_radio = resolveComponent("a-radio");
  const _component_a_col = resolveComponent("a-col");
  const _component_a_row = resolveComponent("a-row");
  const _component_a_radio_group = resolveComponent("a-radio-group");
  const _component_a_checkbox = resolveComponent("a-checkbox");
  const _component_a_checkbox_group = resolveComponent("a-checkbox-group");
  const _component_a_date_picker = resolveComponent("a-date-picker");
  const _component_a_range_picker = resolveComponent("a-range-picker");
  const _component_oss_upload = resolveComponent("oss-upload");
  const _component_a_cascader = resolveComponent("a-cascader");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    _ctx.field.type === "input" ? (openBlock(), createBlock(_component_a_input, {
      key: 0,
      disabled: _ctx.field.disabled,
      style: normalizeStyle(_ctx.getFieldStyle),
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[2] || (_cache[2] = ($event) => _ctx.fieldValue = $event),
      onChange: _cache[3] || (_cache[3] = ($event) => _ctx.handleValueChange($event, _ctx.field.model)),
      placeholder: ((_a = _ctx.field.params) == null ? void 0 : _a.placeholder) || "\u8BF7\u8F93\u5165"
    }, createSlots({ _: 2 }, [
      ((_b = _ctx.field.params) == null ? void 0 : _b.prepend) ? {
        name: "addonBefore",
        fn: withCtx(() => {
          var _a2;
          return [
            createTextVNode(toDisplayString((_a2 = _ctx.field.params) == null ? void 0 : _a2.prepend), 1)
          ];
        }),
        key: "0"
      } : void 0,
      ((_c = _ctx.field.params) == null ? void 0 : _c.append) ? {
        name: "addonAfter",
        fn: withCtx(() => {
          var _a2, _b2, _c2, _d2;
          return [
            ((_a2 = _ctx.field.params) == null ? void 0 : _a2.append.type) === "select" ? (openBlock(), createBlock(_component_a_select, {
              key: 0,
              placeholder: "\u8BF7\u9009\u62E9",
              style: normalizeStyle({ width: ((_c2 = (_b2 = _ctx.field.params) == null ? void 0 : _b2.append.params) == null ? void 0 : _c2.width) || "100px" }),
              value: _ctx.data[(_d2 = _ctx.field.params) == null ? void 0 : _d2.append.model],
              "onUpdate:value": _cache[0] || (_cache[0] = ($event) => {
                var _a3;
                return _ctx.data[(_a3 = _ctx.field.params) == null ? void 0 : _a3.append.model] = $event;
              }),
              disabled: _ctx.field.disabled,
              onChange: _cache[1] || (_cache[1] = ($event) => {
                var _a3;
                return _ctx.handleSelectChange($event, (_a3 = _ctx.field.params) == null ? void 0 : _a3.append.model);
              })
            }, {
              default: withCtx(() => {
                var _a3, _b3;
                return [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions((_a3 = _ctx.field.params) == null ? void 0 : _a3.append, (_b3 = _ctx.field.params) == null ? void 0 : _b3.append.model), (option) => {
                    return openBlock(), createBlock(_component_a_select_option, {
                      key: option.value,
                      value: option.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(option.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ];
              }),
              _: 1
            }, 8, ["style", "value", "disabled"])) : createCommentVNode("", true)
          ];
        }),
        key: "1"
      } : void 0
    ]), 1032, ["disabled", "style", "value", "placeholder"])) : _ctx.field.type === "inputArea" ? (openBlock(), createBlock(_component_a_textarea, mergeProps({
      key: 1,
      disabled: _ctx.field.disabled,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[4] || (_cache[4] = ($event) => _ctx.fieldValue = $event),
      style: _ctx.getFieldStyle,
      onChange: _cache[5] || (_cache[5] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, _ctx.field.props, {
      placeholder: ((_d = _ctx.field.params) == null ? void 0 : _d.placeholder) || ""
    }), null, 16, ["disabled", "value", "style", "placeholder"])) : _ctx.field.type === "number" ? (openBlock(), createBlock(_component_a_input, mergeProps({
      key: 2,
      type: "number",
      disabled: _ctx.field.disabled,
      modelValue: _ctx.fieldValue,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.fieldValue = $event),
      modelModifiers: { number: true },
      style: _ctx.getFieldStyle,
      onChange: _cache[7] || (_cache[7] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, _ctx.field.props, {
      placeholder: ((_e = _ctx.field.params) == null ? void 0 : _e.placeholder) || ""
    }), null, 16, ["disabled", "modelValue", "style", "placeholder"])) : _ctx.field.type === "radio" ? (openBlock(), createBlock(_component_a_radio_group, mergeProps({
      key: 3,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[8] || (_cache[8] = ($event) => _ctx.fieldValue = $event),
      disabled: _ctx.field.disabled,
      style: { "width": "100%" },
      onChange: _cache[9] || (_cache[9] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, _ctx.field.props), {
      default: withCtx(() => [
        !_ctx.field.colCount ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.getOptions(_ctx.field, _ctx.field.model), (item) => {
          return openBlock(), createBlock(_component_a_radio, {
            class: "wrapCheck",
            key: item.value,
            value: item.value
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(item.title), 1)
            ]),
            _: 2
          }, 1032, ["value"]);
        }), 128)) : (openBlock(), createBlock(_component_a_row, {
          key: 1,
          type: "flex",
          class: "flexCheckRow"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions(_ctx.field, _ctx.field.model), (item) => {
              return openBlock(), createBlock(_component_a_col, {
                style: normalizeStyle(_ctx.colStyle),
                key: item.value
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_radio, {
                    class: "flexCheck",
                    value: item.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["value"])
                ]),
                _: 2
              }, 1032, ["style"]);
            }), 128))
          ]),
          _: 1
        }))
      ]),
      _: 1
    }, 16, ["value", "disabled"])) : _ctx.field.type === "checkbox" ? (openBlock(), createBlock(_component_a_checkbox_group, {
      key: 4,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[10] || (_cache[10] = ($event) => _ctx.fieldValue = $event),
      disabled: _ctx.field.disabled,
      style: { "width": "100%" },
      onChange: _cache[11] || (_cache[11] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, {
      default: withCtx(() => [
        !_ctx.field.colCount ? (openBlock(), createBlock(_component_a_row, { key: 0 }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions(_ctx.field, _ctx.field.model), (item) => {
              return openBlock(), createBlock(_component_a_col, { span: 24 }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(_component_a_checkbox, {
                    key: item.value,
                    value: item.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["value"]))
                ]),
                _: 2
              }, 1024);
            }), 256))
          ]),
          _: 1
        })) : (openBlock(), createBlock(_component_a_row, {
          key: 1,
          type: "flex",
          class: "flexCheckRow"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions(_ctx.field, _ctx.field.model), (item) => {
              return openBlock(), createBlock(_component_a_col, {
                style: normalizeStyle(_ctx.colStyle),
                key: _ctx.option.value
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_checkbox, {
                    value: item.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["value"])
                ]),
                _: 2
              }, 1032, ["style"]);
            }), 128))
          ]),
          _: 1
        }))
      ]),
      _: 1
    }, 8, ["value", "disabled"])) : _ctx.field.type === "select" || _ctx.field.type === "multi-select" ? (openBlock(), createBlock(_component_a_select, mergeProps({
      key: 5,
      placeholder: "\u8BF7\u9009\u62E9",
      style: _ctx.getFieldStyle,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[12] || (_cache[12] = ($event) => _ctx.fieldValue = $event),
      mode: _ctx.field.type === "multi-select" ? "multiple" : null,
      disabled: _ctx.field.disabled,
      onChange: _cache[13] || (_cache[13] = ($event) => _ctx.handleSelectChange($event, _ctx.field.model))
    }, _ctx.field.props), {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions(_ctx.field, _ctx.field.model), (option) => {
          return openBlock(), createBlock(_component_a_select_option, {
            key: option.value,
            value: option.value
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(option.title), 1)
            ]),
            _: 2
          }, 1032, ["value"]);
        }), 128))
      ]),
      _: 1
    }, 16, ["style", "value", "mode", "disabled"])) : _ctx.field.type === "date" ? (openBlock(), createBlock(_component_a_date_picker, {
      key: 6,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[14] || (_cache[14] = ($event) => _ctx.fieldValue = $event),
      disabled: _ctx.field.disabled,
      style: normalizeStyle(_ctx.getFieldStyle),
      placeholder: "\u9009\u62E9\u65E5\u671F",
      mode: "date",
      "value-format": "YYYY-MM-DD",
      onChange: _cache[15] || (_cache[15] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, null, 8, ["value", "disabled", "style"])) : _ctx.field.type === "year" ? (openBlock(), createBlock(_component_a_date_picker, {
      key: 7,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[16] || (_cache[16] = ($event) => _ctx.fieldValue = $event),
      disabled: _ctx.field.disabled,
      style: normalizeStyle(_ctx.getFieldStyle),
      mode: "year",
      format: "YYYY \u5E74",
      valueFormat: "YYYY",
      placeholder: "\u8BF7\u9009\u62E9\u5E74",
      picker: "year",
      onChange: _cache[17] || (_cache[17] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, null, 8, ["value", "disabled", "style"])) : _ctx.field.type === "daterange" || _ctx.field.type === "monthrange" ? (openBlock(), createBlock(_component_a_range_picker, mergeProps({
      key: 8,
      value: _ctx.fieldValue,
      "onUpdate:value": _cache[18] || (_cache[18] = ($event) => _ctx.fieldValue = $event),
      style: _ctx.getFieldStyle,
      disabled: _ctx.field.disabled,
      placeholder: [
        `\u5F00\u59CB${_ctx.field.type === "daterange" ? "\u65E5\u671F" : "\u6708\u4EFD"}`,
        `\u7ED3\u675F${_ctx.field.type === "daterange" ? "\u65E5\u671F" : "\u6708\u4EFD"}`
      ],
      format: _ctx.field.type === "daterange" ? "YYYY-MM-DD" : "YYYY-MM",
      "value-format": _ctx.field.type === "daterange" ? "YYYY-MM-DD" : "YYYY-MM",
      onChange: _cache[19] || (_cache[19] = ($event) => _ctx.handleValueChange($event, _ctx.field.model))
    }, _ctx.field.props), null, 16, ["value", "style", "disabled", "placeholder", "format", "value-format"])) : _ctx.field.type === "file" || _ctx.field.type === "imageFile" ? (openBlock(), createBlock(_component_oss_upload, mergeProps({
      key: 9,
      fileUrl: _ctx.fieldValue,
      "onUpdate:fileUrl": _cache[20] || (_cache[20] = ($event) => _ctx.fieldValue = $event),
      type: _ctx.field.type === "imageFile" ? "image" : "file"
    }, _ctx.field.props, {
      btnTxt: _ctx.field.btnTxt,
      onOnChange: _ctx.handleUploadChange
    }), null, 16, ["fileUrl", "type", "btnTxt", "onOnChange"])) : _ctx.field.type === "multiFile" || _ctx.field.type === "multiImageFile" ? (openBlock(), createBlock(_component_oss_upload, mergeProps({
      key: 10,
      "data-list": _ctx.fieldValue,
      "onUpdate:data-list": _cache[21] || (_cache[21] = ($event) => _ctx.fieldValue = $event),
      type: _ctx.field.type === "multiImageFile" ? "image" : "file"
    }, _ctx.field.props, {
      btnTxt: _ctx.field.btnTxt,
      onOnChange: _ctx.handleMultiUploadChange
    }), null, 16, ["data-list", "type", "btnTxt", "onOnChange"])) : _ctx.field.type === "cascader" ? (openBlock(), createBlock(_component_a_cascader, {
      key: 11,
      modelValue: _ctx.fieldValue,
      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => _ctx.fieldValue = $event),
      options: _ctx.field.options,
      expandTrigger: "hover",
      onChange: _cache[23] || (_cache[23] = ($event) => _ctx.handleSelectChange($event, _ctx.field.model)),
      style: { "width": "100%" }
    }, null, 8, ["modelValue", "options"])) : renderSlot(_ctx.$slots, "editRender", {
      key: 12,
      field: _ctx.field
    }, () => {
      var _a2;
      return [
        createVNode(_component_a_input, {
          placeholder: ((_a2 = _ctx.field.params) == null ? void 0 : _a2.placeholder) || "\u8BF7\u8F93\u5165",
          disabled: _ctx.field.disabled,
          value: _ctx.fieldValue,
          "onUpdate:value": _cache[24] || (_cache[24] = ($event) => _ctx.fieldValue = $event),
          onChange: _cache[25] || (_cache[25] = ($event) => _ctx.otherValueChange($event))
        }, null, 8, ["placeholder", "disabled", "value"])
      ];
    }, true)
  ]);
}
var FieldTypeEdit = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-44d251e3"]]);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var dayjs_min = createCommonjsModule(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date())
        return -t2(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return void 0 === t2;
    } }, g = "en", D = {};
    D[g] = M;
    var p = function(t2) {
      return t2 instanceof _;
    }, S = function t2(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, w = function(t2, e2) {
      if (p(t2))
        return t2.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, O = v;
    O.l = S, O.i = p, O.w = function(t2, e2) {
      return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = S(t2.locale, null, true), this.parse(t2);
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (null === e2)
            return new Date(NaN);
          if (O.u(e2))
            return new Date();
          if (e2 instanceof Date)
            return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.$x = t2.x || {}, this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return O;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = w(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return w(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < w(t2);
      }, m2.$g = function(t2, e2, n2) {
        return O.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
          var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (h2) {
          case c:
            return r2 ? l2(1, 0) : l2(31, 11);
          case f:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === f || o2 === c) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[O.p(t2)]();
      }, m2.add = function(r2, h2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = O.p(h2), y2 = function(t2) {
          var e2 = w(l2);
          return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === f)
          return this.set(f, this.$M + r2);
        if ($2 === c)
          return this.set(c, this.$y + r2);
        if ($2 === a)
          return y2(1);
        if ($2 === o)
          return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return O.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, c2 = function(t3) {
          return O.s(s2 % 12 || 12, t3, "0");
        }, d2 = n2.meridiem || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        }, $2 = { YY: String(this.$y).slice(-2), YYYY: O.s(this.$y, 4, "0"), M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
        return r2.replace(y, function(t3, e3) {
          return e3 || $2[t3] || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
        return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
      }, m2.daysInMonth = function() {
        return this.endOf(f).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = S(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return O.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), T = _.prototype;
    return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
      T[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), w.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, w), t2.$i = true), w;
    }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
      return w(1e3 * t2);
    }, w.en = D[g], w.Ls = D, w.p = {}, w;
  });
});
var fieldTypeViewer_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".set-type-field_viewer[data-v-f89a1db2]{color:#000000d9}.set-type-field_viewer .contentRow[data-v-f89a1db2]{display:flex;flex:1;flex-direction:row;flex-wrap:wrap}.set-type-field_viewer .contentRow span[data-v-f89a1db2]{flex:0 0 auto}.set-type-field_viewer .row[data-v-f89a1db2]{display:flex;flex-direction:row;align-items:center}.set-type-field_viewer span[data-v-f89a1db2]{flex:1;white-space:normal;word-break:break-all;line-height:32px}\n")();
const { getItemFromDataSourceById } = SetFormHelper;
const _sfc_main$4 = defineComponent({
  name: "SetFieldTypeViewer",
  components: { OssUpload: SetUpload },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    dynamicKey: {
      type: String,
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    optionDict: {
      type: Object,
      default() {
        return {};
      }
    },
    valueStyle: {
      type: String,
      default() {
        return "";
      }
    }
  },
  emits: ["onValueChange"],
  setup(props, { emit }) {
    const dynamicValue = computed(() => {
      const { data, dynamicKey, field } = props;
      const value = dynamicKey ? data[dynamicKey] : data[field.model];
      const { type } = field;
      if (type === "input" || type === "inputArea" || type === "switch") {
        return value !== null && value !== void 0 ? value : " ";
      }
      return value;
    });
    const inputAreaValue = computed(() => {
      const { data, dynamicKey, field } = props;
      const value = dynamicKey ? data[dynamicKey] : data[field.model];
      return value !== null && value !== void 0 ? value.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;") : "  ";
    });
    const getDynamicValue = () => {
      const { data, dynamicKey, field } = props;
      const value = dynamicKey ? data[dynamicKey] : data[field.model];
      const { type } = field;
      if (type === "input" || type === "inputArea" || type === "switch") {
        return value !== null && value !== void 0 ? value : " ";
      }
      return value;
    };
    const getSingleSelectValueByKey = (key) => {
      const { field, data } = props;
      return getOptions(field, key).find((item) => item.value === data[key]) || {};
    };
    const getSingleSelectValue = () => {
      const { field } = props;
      return getOptions(field, field.model).find((item) => item.value === getDynamicValue()) || {
        title: getDynamicValue()
      };
    };
    const getMultipleSelectValues = () => {
      const { field } = props;
      const values = getDynamicValue() || [];
      return (getOptions(field, field.model).filter((item) => values.indexOf(item.value) !== -1) || []).map((ss) => ss.title);
    };
    const getTimeString = (value, formatString) => {
      if (!value || !value.trim()) {
        return "";
      }
      return dayjs_min(value).format(formatString || "YYYY-MM-DD");
    };
    const getRangeTimeString = (value, formatString) => {
      if (!value || value.length !== 2) {
        return "";
      }
      return getTimeString(value[0], formatString) + " - " + getTimeString(value[1], formatString);
    };
    const getCascaderValue = () => {
      const { data, dynamicKey, field } = props;
      const key = dynamicKey || field.model;
      const item = getItemFromDataSourceById(
        getOptions(field, field.model),
        data[key] ? data[key][data[key].length - 1] : null,
        "value"
      );
      return (item || {}).label;
    };
    const getOptions = (field, key) => {
      const { optionDict } = props;
      return field.options || (optionDict ? optionDict[key || field.model] || [] : []);
    };
    return {
      dynamicValue,
      inputAreaValue,
      getOptions,
      getDynamicValue,
      getSingleSelectValue,
      getMultipleSelectValues,
      getSingleSelectValueByKey,
      getTimeString,
      getRangeTimeString,
      getCascaderValue
    };
  }
});
const _hoisted_1$2 = { class: "set-type-field_viewer" };
const _hoisted_2$2 = { key: 0 };
const _hoisted_3$2 = {
  key: 1,
  class: "row"
};
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" - ");
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = { key: 0 };
const _hoisted_9 = { key: 1 };
const _hoisted_10 = {
  key: 10,
  style: { "display": "flex", "flex-direction": "column" }
};
const _hoisted_11 = { style: { color: "#9B9B9B" } };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f;
  const _component_OssUpload = resolveComponent("OssUpload");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    _ctx.field.type === "input" ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "contentRow",
      style: normalizeStyle(_ctx.valueStyle)
    }, [
      ((_a = _ctx.field.params) == null ? void 0 : _a.prepend) ? (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString((_b = _ctx.field.params) == null ? void 0 : _b.prepend) + " -", 1)) : createCommentVNode("", true),
      createTextVNode(" " + toDisplayString(_ctx.dynamicValue) + " ", 1),
      ((_c = _ctx.field.params) == null ? void 0 : _c.append) ? (openBlock(), createElementBlock("span", _hoisted_3$2, [
        _hoisted_4,
        ((_d = _ctx.field.params) == null ? void 0 : _d.append.type) === "select" ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(_ctx.getSingleSelectValueByKey((_e = _ctx.field.params) == null ? void 0 : _e.append.model).title), 1)) : (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString((_f = _ctx.field.params) == null ? void 0 : _f.append), 1))
      ])) : createCommentVNode("", true)
    ], 4)) : _ctx.field.type === "inputArea" ? (openBlock(), createElementBlock("span", {
      key: 1,
      style: normalizeStyle(_ctx.valueStyle),
      innerHTML: _ctx.inputAreaValue
    }, null, 12, _hoisted_7)) : _ctx.field.type === "number" ? (openBlock(), createElementBlock("span", {
      key: 2,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.dynamicValue), 5)) : _ctx.field.type === "select" ? (openBlock(), createElementBlock("span", {
      key: 3,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getSingleSelectValue().title), 5)) : _ctx.field.type === "switch" ? (openBlock(), createElementBlock("span", {
      key: 4,
      style: normalizeStyle(_ctx.valueStyle)
    }, [
      _ctx.field.switchType === "bool" ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(_ctx.dynamicValue ? "\u662F" : "\u5426"), 1)) : (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(_ctx.dynamicValue), 1))
    ], 4)) : _ctx.field.type === "radio" ? (openBlock(), createElementBlock("span", {
      key: 5,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getSingleSelectValue().title), 5)) : _ctx.field.type === "date" ? (openBlock(), createElementBlock("span", {
      key: 6,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getTimeString(_ctx.dynamicValue, "YYYY-MM-DD")), 5)) : _ctx.field.type === "time" ? (openBlock(), createElementBlock("span", {
      key: 7,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getTimeString(_ctx.dynamicValue, _ctx.field.format || "YYYY-MM-DD HH:mm:ss")), 5)) : _ctx.field.type === "daterange" ? (openBlock(), createElementBlock("span", {
      key: 8,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getRangeTimeString(_ctx.dynamicValue, _ctx.field.format || "YYYY-MM-DD")), 5)) : _ctx.field.type === "multi-select" ? (openBlock(), createElementBlock("span", {
      key: 9,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getMultipleSelectValues().join("\uFF0C")), 5)) : _ctx.field.type === "checkbox" ? (openBlock(), createElementBlock("div", _hoisted_10, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getMultipleSelectValues(), (item) => {
        return openBlock(), createElementBlock("span", {
          style: normalizeStyle(_ctx.valueStyle),
          key: item
        }, toDisplayString(item), 5);
      }), 128))
    ])) : _ctx.field.type === "cascader" ? (openBlock(), createElementBlock("span", {
      key: 11,
      style: normalizeStyle(_ctx.valueStyle)
    }, toDisplayString(_ctx.getCascaderValue()), 5)) : _ctx.field.type === "file" || _ctx.field.type === "imageFile" ? (openBlock(), createBlock(_component_OssUpload, mergeProps({
      key: 12,
      fileUrl: _ctx.dynamicValue,
      "onUpdate:fileUrl": _cache[0] || (_cache[0] = ($event) => _ctx.dynamicValue = $event),
      type: _ctx.field.type === "imageFile" ? "image" : "file",
      needFileName: (_ctx.field.options || {}).needFileName === false ? false : true
    }, _ctx.field.props, { "is-edit": false }), null, 16, ["fileUrl", "type", "needFileName"])) : _ctx.field.type === "multiFile" || _ctx.field.type === "multiImageFile" ? (openBlock(), createBlock(_component_OssUpload, mergeProps({
      key: 13,
      dataList: _ctx.dynamicValue,
      "onUpdate:dataList": _cache[1] || (_cache[1] = ($event) => _ctx.dynamicValue = $event),
      type: _ctx.field.type === "multiImageFile" ? "image" : "file"
    }, _ctx.field.props, { "is-edit": false }), null, 16, ["dataList", "type"])) : renderSlot(_ctx.$slots, "valueRender", {
      key: 14,
      field: _ctx.field
    }, () => [
      createElementVNode("span", _hoisted_11, toDisplayString(_ctx.dynamicValue), 1)
    ], true)
  ]);
}
var FieldTypeViewer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-f89a1db2"]]);
var formTypeEdit_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".set-form-type_edit .ant-form-item__label[data-v-3a0376da]{font-weight:700;line-height:1.5}.set-form-type_edit .ant-form-item__content[data-v-3a0376da]{color:#000;font-weight:400;line-height:1.5}\n")();
const _sfc_main$3 = defineComponent({
  name: "SetFormTypeEdit",
  components: { SetTypeFieldEdit: FieldTypeEdit, InfoCircleFilled },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    dynamicKey: {
      type: String,
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    optionDict: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default() {
        return null;
      }
    },
    showLabel: {
      type: Boolean,
      default() {
        return true;
      }
    },
    error: {
      type: String,
      default() {
        return null;
      }
    }
  },
  emits: ["onValueChange", "onSwitchChange"],
  setup(props, { emit }) {
    const fieldValue = ref(props.data[props.dynamicKey || props.field.model]);
    const handleValueChange = (key, event) => {
      emit("onValueChange", key, event);
    };
    const labelCol = computed(() => {
      const { showLabel, labelWidth, field } = props;
      return showLabel ? {
        style: `${field.labelWidth || labelWidth ? `width: ${field.labelWidth || labelWidth}` : ""}`
      } : { span: 0 };
    });
    const handleSwitchChange = (key, event) => {
      emit("onSwitchChange", key, event);
      emit("onValueChange", key, event);
    };
    watchEffect(() => {
      console.log("SetFormTypeEdit  ====> watchEffect ");
      fieldValue.value = props.data[props.dynamicKey || props.field.model];
    });
    return { fieldValue, labelCol, handleValueChange, handleSwitchChange };
  }
});
const _hoisted_1$1 = { class: "set-form-type_edit" };
const _hoisted_2$1 = {
  key: 0,
  class: "el-form-item__label"
};
const _hoisted_3$1 = { style: { display: "inline-block" } };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SetTypeFieldEdit = resolveComponent("SetTypeFieldEdit");
  const _component_InfoCircleFilled = resolveComponent("InfoCircleFilled");
  const _component_a_tooltip = resolveComponent("a-tooltip");
  const _component_a_form_item = resolveComponent("a-form-item");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    _ctx.field.type === "label" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      createElementVNode("label", _hoisted_3$1, toDisplayString(_ctx.field.label || " "), 1)
    ])) : (openBlock(), createBlock(_component_a_form_item, mergeProps({
      key: 1,
      rules: _ctx.field.rules,
      name: _ctx.dynamicKey || _ctx.field.model,
      required: _ctx.field.required,
      validateFirst: true,
      label: _ctx.showLabel ? _ctx.field.label : null,
      labelCol: _ctx.labelCol,
      ref: _ctx.field.model,
      validateStatus: _ctx.error ? "error" : void 0,
      help: _ctx.error
    }, _ctx.field.formProps), createSlots({
      default: withCtx(() => [
        createVNode(_component_SetTypeFieldEdit, {
          field: _ctx.field,
          dynamicKey: _ctx.dynamicKey,
          fieldValue: _ctx.fieldValue,
          data: _ctx.data,
          optionDict: _ctx.optionDict,
          onOnValueChange: _ctx.handleValueChange,
          onOnSwitchChange: _ctx.handleSwitchChange
        }, {
          editRender: withCtx((scope) => [
            renderSlot(_ctx.$slots, "editRender", {
              field: scope.field
            }, void 0, true)
          ]),
          _: 3
        }, 8, ["field", "dynamicKey", "fieldValue", "data", "optionDict", "onOnValueChange", "onOnSwitchChange"])
      ]),
      _: 2
    }, [
      _ctx.field.labelRemark ? {
        name: "label",
        fn: withCtx(() => [
          createElementVNode("span", null, [
            createTextVNode(toDisplayString(_ctx.field.label) + " ", 1),
            createVNode(_component_a_tooltip, {
              class: "item",
              effect: "dark",
              content: _ctx.field.labelRemark,
              placement: "top"
            }, {
              default: withCtx(() => [
                createVNode(_component_InfoCircleFilled)
              ]),
              _: 1
            }, 8, ["content"])
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1040, ["rules", "name", "required", "label", "labelCol", "validateStatus", "help"]))
  ]);
}
var FormTypeEdit = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-3a0376da"]]);
var formTypeViewer_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".set-form-type_viewer .ant-form-item__label[data-v-7b0b5bc2]{font-weight:700;line-height:1.5}.set-form-type_viewer .ant-form-item__content[data-v-7b0b5bc2]{color:#000;font-weight:400;line-height:1.5}\n")();
const _sfc_main$2 = defineComponent({
  name: "SetFormTypeEdit",
  components: { SetTypeFieldViewer: FieldTypeViewer, InfoCircleFilled },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    dynamicKey: {
      type: String,
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    optionDict: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default() {
        return null;
      }
    },
    showLabel: {
      type: Boolean,
      default() {
        return true;
      }
    },
    valueStyle: {
      type: String,
      default() {
        return "";
      }
    }
  },
  setup(props, { emit }) {
    const dynamicValue = computed(() => {
      const { data, dynamicKey, field } = props;
      const value = dynamicKey ? data[dynamicKey] : data[field.model];
      const { type } = field;
      if (type === "input" || type === "inputArea" || type === "switch") {
        return value !== null && value !== void 0 ? value : " ";
      }
      return value;
    });
    const labelCol = computed(() => {
      const { showLabel, labelWidth, field } = props;
      return showLabel ? {
        style: `${field.labelWidth || labelWidth ? `width: ${field.labelWidth || labelWidth}` : ""}`
      } : { span: 0 };
    });
    return { dynamicValue, labelCol };
  }
});
const _hoisted_1 = { class: "set-form-type_viewer" };
const _hoisted_2 = {
  key: 0,
  class: "el-form-item__label"
};
const _hoisted_3 = { style: { display: "inline-block" } };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SetTypeFieldViewer = resolveComponent("SetTypeFieldViewer");
  const _component_a_form_item = resolveComponent("a-form-item");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _ctx.field.type === "label" ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createElementVNode("label", _hoisted_3, toDisplayString(_ctx.field.label || " "), 1)
    ])) : (openBlock(), createBlock(_component_a_form_item, {
      key: 1,
      name: _ctx.dynamicKey || _ctx.field.model,
      required: false,
      validateFirst: true,
      label: _ctx.showLabel ? _ctx.field.label : null,
      labelCol: _ctx.labelCol,
      ref: _ctx.field.model
    }, {
      default: withCtx(() => [
        createVNode(_component_SetTypeFieldViewer, {
          field: _ctx.field,
          dynamicKey: _ctx.dynamicKey,
          data: _ctx.data,
          optionDict: _ctx.optionDict,
          "value-style": _ctx.valueStyle
        }, {
          valueRender: withCtx((scope) => [
            renderSlot(_ctx.$slots, "fieldRender", {
              field: scope.field
            }, void 0, true)
          ]),
          _: 3
        }, 8, ["field", "dynamicKey", "data", "optionDict", "value-style"])
      ]),
      _: 3
    }, 8, ["name", "label", "labelCol"]))
  ]);
}
var FormTypeViewer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-7b0b5bc2"]]);
const _sfc_main$1 = defineComponent({
  name: "SetFormRowEdit",
  components: { SetFormTypeEdit: FormTypeEdit },
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      }
    },
    fieldRows: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    optionDict: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default() {
        return null;
      }
    },
    errors: {
      type: Object,
      default() {
        return {};
      }
    },
    form: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  emits: ["onValueChange", "onSwitchChange"],
  setup(props, { emit }) {
    const handleValueChange = (key, event) => {
      emit("onValueChange", key, event);
      if (props.form) {
        const fieldMatch = props.fields.find((field) => field.model === key);
        if (fieldMatch && fieldMatch.type.indexOf("ile") !== -1) {
          props.form.validateFields([key]);
        }
      }
    };
    const handleSwitchChange = (key, event) => {
      emit("onSwitchChange", key, event);
      emit("onValueChange", key, event);
    };
    return { handleValueChange, handleSwitchChange };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SetFormTypeEdit = resolveComponent("SetFormTypeEdit");
  const _component_a_col = resolveComponent("a-col");
  const _component_a_row = resolveComponent("a-row");
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fieldRows, (row) => {
      return openBlock(), createBlock(_component_a_row, {
        key: row.key,
        gutter: 20
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row.children, (field) => {
            return openBlock(), createBlock(_component_a_col, {
              key: field.model,
              span: field.span || 24,
              offset: field.offset || 0
            }, {
              default: withCtx(() => [
                createVNode(_component_SetFormTypeEdit, {
                  field,
                  "label-width": _ctx.labelWidth,
                  data: _ctx.data,
                  optionDict: _ctx.optionDict,
                  error: _ctx.errors[field.model],
                  onOnValueChange: _ctx.handleValueChange,
                  onOnSwitchChange: _ctx.handleSwitchChange
                }, {
                  editRender: withCtx((scope) => [
                    renderSlot(_ctx.$slots, "itemRender", {
                      field: scope.field
                    })
                  ]),
                  _: 2
                }, 1032, ["field", "label-width", "data", "optionDict", "error", "onOnValueChange", "onOnSwitchChange"])
              ]),
              _: 2
            }, 1032, ["span", "offset"]);
          }), 128))
        ]),
        _: 2
      }, 1024);
    }), 128))
  ]);
}
var FormRowEdit = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  name: "SetFormRowViewer",
  components: { SetFormTypeViewer: FormTypeViewer },
  props: {
    fields: {
      type: Array,
      default() {
        return [];
      }
    },
    fieldRows: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    optionDict: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default() {
        return null;
      }
    },
    errors: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["onValueChange", "onSwitchChange"],
  setup(props, { emit }) {
    const handleValueChange = (key, event) => {
      emit("onValueChange", key, event);
    };
    const handleSwitchChange = (key, event) => {
      emit("onSwitchChange", key, event);
      emit("onValueChange", key, event);
    };
    return { handleValueChange, handleSwitchChange };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SetFormTypeViewer = resolveComponent("SetFormTypeViewer");
  const _component_a_col = resolveComponent("a-col");
  const _component_a_row = resolveComponent("a-row");
  return openBlock(), createElementBlock("div", null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fieldRows, (row) => {
      return openBlock(), createBlock(_component_a_row, {
        key: row.key,
        gutter: 20
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row.children, (field) => {
            return openBlock(), createBlock(_component_a_col, {
              key: field.key || field.model,
              span: field.span,
              offset: field.offset || 0
            }, {
              default: withCtx(() => [
                createVNode(_component_SetFormTypeViewer, {
                  field,
                  "label-width": _ctx.labelWidth,
                  data: _ctx.data,
                  optionDict: _ctx.optionDict,
                  onOnValueChange: _ctx.handleValueChange,
                  onOnSwitchChange: _ctx.handleSwitchChange
                }, {
                  fieldRender: withCtx((scope) => [
                    renderSlot(_ctx.$slots, "itemRender", {
                      field: scope.field
                    })
                  ]),
                  _: 2
                }, 1032, ["field", "label-width", "data", "optionDict", "onOnValueChange", "onOnSwitchChange"])
              ]),
              _: 2
            }, 1032, ["span", "offset"]);
          }), 128))
        ]),
        _: 2
      }, 1024);
    }), 128))
  ]);
}
var FormRowViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
function install(app) {
  const packages = [SetUpload, FieldTypeEdit, FieldTypeViewer, FormRowEdit, FormRowViewer, FormTypeEdit, FormTypeViewer];
  packages.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
const version = "0.0.0";
var mixui_build = { install, version };
export { FieldTypeEdit, FieldTypeViewer, FormRowEdit, FormRowViewer, FormTypeEdit, FormTypeViewer, SetUpload, mixui_build as default, install, version };

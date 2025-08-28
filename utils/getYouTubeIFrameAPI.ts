//@ts-nocheck
export default async () => {
    if (window.YT) return window.YT
  
    await new Promise((res, rej) => {
      var tag: HTMLScriptElement = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      var firstScriptTag: HTMLScriptElement = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  
      window.onYouTubeIframeAPIReady = () => {
        res()
      }
    })
  
    return window.YT
  }
  
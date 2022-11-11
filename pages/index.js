import React from "react"
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import { StyledTimeline } from "../src/components/Timeline"
import { Menu } from "../src/components/Menu"

function HomePage() {
 
   const [valorDoFiltro, setValorDoFiltro] = React.useState("")

   return (
      <>
         <div style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            // backgroundColor: "red",
         }}>
            //prop drilling
            
            <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
            <Header />
            <Timeline searchValue={valorDoFiltro} playlists={config.playlists} aluratubes={config.aluratubes} />
         </div>
      </>
   );
}

export default HomePage

const StyledHeader = styled.div`
   background-color: ${({theme}) => theme.backgroundLevel1};


   .user-info{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
   }
   .user-info img {
      width: 80px;
      height: 80px; 
      border-radius: 50%;
   }

   .banner {
      height: 250px;
      width: 100%;
      object-fit: cover;
   }
`

function Header() {
   return (
      <StyledHeader>
         <img className="banner" src={config.banner} />

         <section className="user-info">
            <img src={`https://github.com/${config.github}.png`} />
            <div>
               <h2>
                  {config.name}
               </h2>
               <p>
                  {config.job}
               </p>
            </div>
         </section>
      </StyledHeader>
   )
}

function Timeline({ searchValue, ...props }) {

   const playlistNames = Object.keys(props.playlists)

   return (
      <StyledTimeline>
         {playlistNames.map(playlistName => {
            const videos = props.playlists[playlistName]

            return (
               <section key={playlistName}>
                  <h2>{playlistName}</h2>
                  <div>
                     {
                        videos
                           .filter(video => {
                              const titleNormalized = video.title.toLowerCase()
                              const searchValueNormalized = searchValue.toLowerCase()
                              return titleNormalized.includes(searchValueNormalized)
                           })
                           .map(video => {
                              return (
                                 <a key={video.url} href={video.url}>
                                    <img src={video.thumb} />
                                    <span>
                                       {video.title}
                                    </span>
                                 </a>
                              )
                           })
                     }
                  </div>

               </section>
            )
         })}
         <section className="aluratubes-favoritos">
            <h2>AluraTubes Favoritos</h2>
            <div>
               {
                  props.aluratubes.map(aluratuber => {
                     return (
                        <a href={`https://www.youtube.com/${aluratuber.channel}`}>
                           <div className="aluratuber">
                              <img src={aluratuber.photo} />
                              <span>
                                 {aluratuber.name}
                              </span>
                           </div>
                        </a>
                     )
                  })
               }
            </div>
         </section>
      </StyledTimeline>
   )
}
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import { StyledTimeline } from "../src/components/Timeline"
import { Menu } from "../src/components/Menu"

function HomePage() {
   const estilosDaHomePage = {

   }

   return (
      <>
         <CSSReset />
         <div style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            // backgroundColor: "red",
         }}>
            <Menu />
            <Header />
            <Timeline playlists={config.playlists} />
         </div>
      </>
   );
}

export default HomePage

const StyledHeader = styled.div`
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
      object-fit: none;
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

function Timeline(props) {

   const playlistNames = Object.keys(props.playlists)

   return (
      <StyledTimeline>
         {playlistNames.map(playlistName => {
            const videos = props.playlists[playlistName]

            return (
               <section>
                  <h2>{playlistName}</h2>
                  <div>
                     {
                        videos.map(video => {
                           return (
                              <a href={video.url}>
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
      </StyledTimeline>
   )
}
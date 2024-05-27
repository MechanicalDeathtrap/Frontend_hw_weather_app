import style from "./WelcomeComponent.module.sass"
import sunIcon from "/src/assets/sun-fog-svgrepo-com.svg"
export const WelcomeComponent = () =>{
    return(
        <div className={style.welcomeContainer}>
            <h1 className={style.welcometitle}>It's empty here, but you can find some sunny news!</h1>
            <img src={sunIcon} alt="sun" className={style.welcomeImage}/>
        </div>
    )
}
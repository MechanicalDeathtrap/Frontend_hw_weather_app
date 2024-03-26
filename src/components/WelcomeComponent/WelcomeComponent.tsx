import style from "./WelcomeComponent.module.sass"
export const WelcomeComponent = () =>{
    return(
        <div className={style.welcomeContainer}>
            <h1 className={style.welcometitle}>It's empty here, but you can find some sunny news!</h1>
            <img src="/src/assets/sun-fog-svgrepo-com.svg" alt="sun" className={style.welcomeImage}/>
        </div>
    )
}
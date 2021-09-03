import { FaFacebook } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn,signOut, useSession } from 'next-auth/client'
import styles from './styles.module.scss'

export const SignInButton:React.FC = () => {
  const [ session ] = useSession()
  // const ref: string = String(session!.userRef["@ref"].id)
  // console.log(session?.userRef["@ref"].id, ref)

  const logged = false

  return session ? (
    <button
        type="button"
        className={styles.signedButton}
        onClick={()=>signOut()}
      >
        {/* <FaFacebook color="#4267B2" /> */}
        <img src={String(session.user?.image)} alt="" />
        {/* {session.user?.name} */}
        <FiX color="#ffffff" className={styles.closeIcon} />
      </button>
  ):(
    <button
        type="button"
        className={styles.signInButton}
        onClick={()=>signIn('facebook')}
        formMethod='POST'
      >
        <FaFacebook color="#4267B2" />
        Log In
      </button>
  )
}

import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })
  return(
    <header className={styles.headerContainer}> 
      <a href="/">
        <h2>jobsGo.</h2>
      </a>
      <p>Encontre o emprego dos sonhos</p>
      <span>{currentDate}</span>
    </header>
  )
}
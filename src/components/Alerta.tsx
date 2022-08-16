interface IAlertaProps { 
  msg: string;
  error?: boolean;
}

const Alerta = ({ error, msg }: IAlertaProps) => {
  return (
    <div className={`${error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded uppercase text-white font-bold text-sm mt-10`}>
      {msg}
    </div>
  )
}

export default Alerta;
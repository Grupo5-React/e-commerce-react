import Button from '@mui/material/Button';

export default function Botao(nome, onClick) {
  return (
    <Button onClick={onClick} variant="contained" disableElevation>
      {nome}
    </Button>
  );
}
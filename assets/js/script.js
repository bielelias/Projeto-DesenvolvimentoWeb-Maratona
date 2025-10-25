
// Global settings
const EVENT_DATE = new Date('2025-12-15T07:00:00-03:00'); // ajuste a data/hora do evento
const CITY = '<<Cidade>>'; // substitua pelo nome da cidade

// Countdown
export function startCountdown(){
  const dd=document.getElementById('dd'),
        hh=document.getElementById('hh'),
        mm=document.getElementById('mm'),
        ss=document.getElementById('ss');
  if(!dd||!hh||!mm||!ss)return;
  const tick=()=>{
    const now=new Date();
    let delta=EVENT_DATE-now;
    if(delta<0)delta=0;
    const d=Math.floor(delta/864e5);
    const h=Math.floor(delta%864e5/36e5);
    const m=Math.floor(delta%36e5/6e4);
    const s=Math.floor(delta%6e4/1e3);
    dd.textContent=String(d);
    hh.textContent=String(h).padStart(2,'0');
    mm.textContent=String(m).padStart(2,'0');
    ss.textContent=String(s).padStart(2,'0');
  };
  tick();
  setInterval(tick,1000);
}

// Simple slider
export function startSlider(){
  const track=document.querySelector('.slides');
  if(!track)return;
  const slides=document.querySelectorAll('.slide');
  let idx=0;
  const go=n=>{
    idx=(n+slides.length)%slides.length;
    track.style.transform=`translateX(-${idx*100}%)`;
  };
  document.getElementById('prev')?.addEventListener('click',()=>go(idx-1));
  document.getElementById('next')?.addEventListener('click',()=>go(idx+1));
  setInterval(()=>go(idx+1),5000);
}

// Lightbox for gallery
export function enableLightbox(){
  const lb=document.querySelector('.lightbox');
  if(!lb)return;
  const img=lb.querySelector('img');
  document.querySelectorAll('.gallery img').forEach(el=>{
    el.addEventListener('click',()=>{
      img.src=el.src;
      lb.classList.add('active');
    });
  });
  lb.addEventListener('click',()=>lb.classList.remove('active'));
}

// Form validation + BMI
export function setupForm(){
  const form=document.getElementById('inscricao-form');
  if(!form)return;
  const peso=form.querySelector('#peso');
  const altura=form.querySelector('#altura');
  const imcOut=form.querySelector('#imc');
  const alertBox=document.getElementById('form-alert');

  function calcIMC(){
    const p=parseFloat(peso.value.replace(',','.'));
    const a=parseFloat(altura.value.replace(',','.'));
    if(!isFinite(p)||!isFinite(a)||a<=0)return null;
    return p/(a*a);
  }

  function updateIMC(){
    const v=calcIMC();
    if(v==null){imcOut.value='';return}
    imcOut.value=v.toFixed(2);
  }

  peso.addEventListener('input',updateIMC);
  altura.addEventListener('input',updateIMC);

  form.addEventListener('submit',e=>{
    alertBox.textContent='';
    alertBox.style.display='none';
    // basic required check
    if(!form.checkValidity()){
      e.preventDefault();
      alertBox.textContent='Preencha todos os campos obrigatórios.';
      alertBox.style.display='block';
      return;
    }
    const v=calcIMC();
    if(v==null||v<17||v>35){
      e.preventDefault();
      alertBox.textContent='IMC fora da faixa permitida (17 a 35).';
      alertBox.style.display='block';
      return;
    }
    alert('Inscrição enviada com sucesso!');
  });
}


function changeText (label) {
   const phrase = label.textContent;
   let text = '';
   for (const item of phrase) {
    if (item !== ' ') {
        text += `
            <b>${item}</b>
        `;
    } else {
        text += `
            <u>${item}</u>
        `;
    }
   }
   label.innerHTML = text;
}
function skills () {
    const skills = document.querySelector('.slider_skills');
    const list = document.querySelectorAll('.slider_skills img');
    const image = Array.from(list).map (element => element.getAttribute ('src'));
    let count = 0;
    let html = `<img src="${image[count]}" alt="hard skill">`;
    skills.innerHTML = html;
    const prev = document.querySelector('.btn_prev');
    const next = document.querySelector('.btn_next');
    prev.addEventListener('click', () => {
        clearInterval (interval);
        if (0 < count) {
            count--;
        } else {
            count = image.length-1;
        }
        html = `<img src="${image[count]}" alt="hard skill">`; 
        skills.innerHTML = html;
    });
    next.addEventListener('click', () => {
        clearInterval (interval);
        if (count < image.length-1) {
            count++;
        } else {
            count = 0;
        }
        html = `<img src="${image[count]}" alt="hard skill">`; 
        skills.innerHTML = html;
    });
   const interval = setInterval (() => {
        if (count < image.length-1) {
            count++;
        } else {
            count = 0;
        }
        html = `<img src="${image[count]}" alt="hard skill">`; 
        skills.innerHTML = html;
    }, 2000);
}
function animateText(label) {
    const text = document.querySelectorAll('b');
    let i = 0;
    const print = setInterval(() => {
        text[i].classList.toggle('zoom');
        i++;
        if (i >= text.length) {
            clearInterval (print);
            i = 0;
            const clear = setInterval(() => {
                text[i].classList.toggle('zoom');
                i++;
                if (i >= text.length) {
                    clearInterval (clear);
                    i = 0;
                }
            }, 200);
        }
    }, 200);
    
}
function mode () {
    const body = document.querySelector ('body');
    const btn = document.querySelector('.icon_mode');
    const icon = document.querySelector('.icon_mode ion-icon');
    const iframe = document.querySelector('.header iframe');
    const link = iframe.contentDocument.querySelector('link');
    btn.addEventListener ('click', () => {
        body.classList.toggle('dark');

        if (icon.name === 'sunny-outline') {
            icon.name = 'moon-outline';
        } else {
            icon.name = 'sunny-outline';
        }

        if (link.getAttribute('href') === './src/Fondo/dark.css') {
            link.href = './src/Fondo/light.css';
        } else {
            link.href = './src/Fondo/dark.css';
        }
    });
}
function sound () {
    const btn = document.querySelector('.icon_volume');
    const icon = document.querySelector('.icon_volume ion-icon');
    const audio = document.querySelector('.icon_volume audio');
    btn.addEventListener('click', () => {
        if (icon.name==='volume-mute-outline') {
            icon.name = 'volume-high-outline';
        } else {
            icon.name = 'volume-mute-outline';
        }
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
}
function social () {
    const h1 = document.querySelector('h1');
    const nav = document.querySelector('.header_nav');
    const footer = document.querySelector('.footer');
    footer.classList.toggle('active');
    changeText(h1);
    animateText(h1);
    setTimeout ( () => {
        footer.classList.toggle('active');
    }, 2000);
    nav.addEventListener('click', () => {
        footer.classList.toggle('active');
        animateText(h1);
        setTimeout ( () => {
            footer.classList.toggle('active');
        }, 2000);
    });
}
async function getApi () {
    const url = 'https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects';
    try {
        const data = await fetch(url);
        const res = await data.json ();
        localStorage.setItem('projects', JSON.stringify(res));
        return res;
    } catch (error) {
        console.log (error);
    }
}
function printProjects (projects) {
    const list = document.querySelectorAll('.splide__slide');
    const path = location.href.split('/').at(-1).at(0);
    projects.forEach((project, i) => {
        const {descripcion, image, tecnologias, titulo, description, technologies, title } = project;
        let html = '';
        if (path === 'e') {
            html = `
            <div>
                <h3>${title}</h3>
                <p>${description}</p>
                <p>${technologies}</p>
            </div>
        <figure>
            <img src="${image}" alt="slider item">
        </figure>
        `;
        } else {
            html = `
            <div>
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <p>${tecnologias}</p>
            </div>
        <figure>
            <img src="${image}" alt="slider item">
         </figure>
         `;
        }
        list[i].innerHTML = html;
    });
}



function slider () {

    const splide = new Splide( '.splide', {
        type: 'loop',
        autoplay: true,
        interval: 3000,
        speed: 1000,
        breakpoints: {
            849: {
                direction: 'ttb',
                height: '65vh',
            },
      }
      } );
    splide.mount();
}




async function main ()  {
    const projects = JSON.parse(localStorage.getItem('projects')) || await getApi ();
    printProjects (projects);
    skills();
    mode ();
    sound ();
    social ();
    slider ();

}

main ();
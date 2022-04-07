

$(() => {

    let immagini = [
        'img/amare.png',
        'img/amare.png',
        'img/amare1.png',
        'img/amare1.png',
        'img/arrabbiato.png',
        'img/arrabbiato.png',
        'img/bello.png',
        'img/bello.png',
        'img/piangere.png',
        'img/piangere.png',
        'img/ridere.png',
        'img/ridere.png',
        'img/shock.png',
        'img/shock.png',
        'img/spavento.png',
        'img/spavento.png'
    ]

    var confronto = [];
    var casellaConfronto = [];
    var index = 0;
    var trovato = 0;
    var contatore = 0;

    function shuffle(a) {
        var currentIndex = a.length;
        var temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = a[currentIndex];
            a[currentIndex] = a[randomIndex];
            a[randomIndex] = temporaryValue;
        }
        return a;
    }

    function startGame() {
        //creazione display confronti
        $('<h2>Numero confronti : <span></span></h2>').appendTo('.container');
        //creazione table
        $(`<div class='tavolo'></div>`).appendTo('.container');

        //creazione array mischiato tramite shuffle
        let immaginiShuff = shuffle(immagini);

        //creazione caselle  con id dinamico e immagini
        for (let id = 0; id < 16; id++) {
            $(`<div class='casella' id =${id}></div>`).appendTo('.tavolo');
            let src = immaginiShuff[id];
            $(`<img src=${src}>`).appendTo(`#${id}`);
        }
        $('img').hide();


        // event onclick sulle caselle
        $('.casella').on('click', function () {
            $(this).children().show();
            confronto[index] = $(this).children().attr('src');
            casellaConfronto[index] = this;
            confronti();
        })

        //css classe tavolo
        $('.tavolo').css({
            'width': '600px',
            'height': '600px',
            'margin': 'auto',
            'display': 'flex',
            'flex-wrap': 'wrap',
            'justify-content': 'space-evenly'
        });
        // css classe casella
        $('.casella').css({
            'width': '23%',
            'height': '23%',
            'background-color': 'cadetblue',
            'border': '1px solid black',
            'box-sizing': 'border-box'
            
        });
        //css immagini
        $('img').css({
            'width': '100%',
            'height': '100%',
            'position':'relative'
        });
    }

    startGame();

    function confronti() {
        if (index == 1) {
            contatore++;
            $('span').text(contatore);
            if (confronto[0] !== confronto[1]) {
                setTimeout(function () {
                    $(casellaConfronto[1]).children().hide();
                    $(casellaConfronto[0]).children().hide();
                    index = 0;
                }, 800);
            }
            else {
                $(casellaConfronto[0]).children().animate({
                    'left':'10px'
                },200).animate({
                    'left':'0px'
                },200);
                $(casellaConfronto[1]).children().animate({
                    'left':'10px'
                },200).animate({
                    'left':'0px'
                },200);

                index = 0;
                confronto = [];
                casellaConfronto = [];
                trovato++;
            }
        } else {
            index++;
        }
        if (trovato == 8) {
            $(`<h2 class='banner'>Hai vinto</h2>`).appendTo('.container');
            $(`<button>Gioca ancora</button>`).on('click',giocaAncora).appendTo('.container');
            //css button e banner
            $('button').css({
                'display':'block',
                'margin':'auto',
                'background-color': 'cadetblue'
            });
            $('.banner').css({
                'text-align':'center'
            });
        }
    }

    function giocaAncora() {
        $('.container').text('');
        confronto = [];
        casellaConfronto = [];
        index = 0;
        trovato = 0;
        contatore = 0;
        startGame();
    }


})
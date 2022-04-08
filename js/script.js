

$(() => {
    //creazione set di immagini
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
    let immaginiD = [
        'img2/bacio.png',
        'img2/bacio.png',
        'img2/cerniera.png',
        'img2/cerniera.png',
        'img2/contrariato.png',
        'img2/contrariato.png',
        'img2/cuoricini.png',
        'img2/cuoricini.png',
        'img2/devil.png',
        'img2/devil.png',
        'img2/fulmine.png',
        'img2/fulmine.png',
        'img2/google.png',
        'img2/google.png',
        'img2/indianas.png',
        'img2/indianas.png',
        'img2/occhiAlCielo.png',
        'img2/occhiAlCielo.png',
        'img2/occhiCuore.png',
        'img2/occhiCuore.png',
        'img2/sbuffa.png',
        'img2/sbuffa.png',
        'img2/senzaBocca.png',
        'img2/senzaBocca.png',
        'img2/serio.png',
        'img2/serio.png',
        'img2/smorfia.png',
        'img2/smorfia.png',
        'img2/sopraciglia.png',
        'img2/sopraciglia.png',
        'img2/covid.png',
        'img2/covid.png'
    ];
    //creazione livelli di difficoltà
    class Difficolta {
        constructor(immagini, dimensione, width, trovato, widthT, aiuto) {
            this.setImmagini = immagini;
            this.dimensione = dimensione;
            this.width = width;
            this.trovato = trovato;
            this.widthT = widthT;
            this.aiuto = aiuto;
        }
    }

    let facile = new Difficolta(immagini, 16, 23, 8, 600, aiutoFacile);
    let difficile = new Difficolta(immaginiD, 32, 12, 16, 1200, aiutoDifficle);


    // dichiarazione variabili
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
    var immaginiShuff;

    //invocazione di inizio gioco al caricamento della pagina
    startGame(facile);

    //funzione start game il parametro 'diff' è la difficoltà(facile o difficile)
    function startGame(diff) {
        //creazione bottoni
        $('<button>Facile</button>').on('click', giocaFacile).appendTo('.container');
        $('<button>Difficile</button>').on('click', giocaDifficile).appendTo('.container');
        $('<br><button id=' + 'aiuto' + '>Aiuto</button>').on('click', diff.aiuto).appendTo('.container');
        $('<p>*Nota per il proff, immagino non ne possa più di giocare a memory, con la funzione aiuto ho voluto aiutarla</p>').appendTo('.container');

        //creazione display confronti
        $('<h2>Numero confronti : <span></span></h2>').appendTo('.container');
        //creazione table
        $(`<div class='tavolo'></div>`).appendTo('.container');

        //creazione array mischiato tramite shuffle
        immaginiShuff = shuffle(diff.setImmagini);

        //creazione caselle  con id dinamico e immagini
        for (let id = 0; id < diff.dimensione; id++) {
            $(`<div class='casella' id =${id}></div>`).appendTo('.tavolo');
            let src = immaginiShuff[id];
            $(`<img src=${src}>`).appendTo(`#${id}`);
        }
        $('img').hide();


        // event onclick sulle caselle
        $('.casella').on('click', function () {
            $(this).children().show();
            $(this).addClass('disabled');
            confronto[index] = $(this).children().attr('src');
            casellaConfronto[index] = this;
            confronti(diff);
        })

        //css dinamico classe tavolo
        $('.tavolo').css({
            'width': diff.widthT + 'px',
        });
        // css dinamico classe casella
        $('.casella').css({
            'width': diff.width + '%',
        });

    }

    function confronti(diff) {
        if (index == 1) {
            contatore++;
            $('span').text(contatore);
            if (confronto[0] !== confronto[1]) {
                $('.casella').addClass('disabled');
                setTimeout(function () {
                    $(casellaConfronto[1]).children().hide();
                    $(casellaConfronto[0]).children().hide();
                    $('.casella').removeClass('disabled');
                    index = 0;
                }, 800);
            }
            else {
                $(casellaConfronto[1]).addClass('blocca');
                $(casellaConfronto[0]).addClass('blocca');
                $(casellaConfronto[0]).children().animate({
                    'left': '10px'
                }, 200).animate({
                    'left': '0px'
                }, 200);
                $(casellaConfronto[1]).children().animate({
                    'left': '10px'
                }, 200).animate({
                    'left': '0px'
                }, 200);

                index = 0;
                confronto = [];
                casellaConfronto = [];
                trovato++;
            }
        } else {
            index++;
        }
        if (trovato == diff.trovato) {
            vittoria();
        }
    }


    function vittoria() {
        setTimeout(() => {
            $('h2,p,button').hide(1000);
            $('.casella').each(function () {
                intervallo = setInterval(() => {
                    $(this).css({
                        'transform': `rotate(${Math.round(Math.random() * 360)}deg)`});
                }, 100);
            });
            $('.casella').each(function () {
                setTimeout(() => {
                }, Math.round(Math.random() * 1000));
                let caso = Math.round(Math.random() * 20)
                if (caso <= 10) {
                    if (caso <= 5) {
                        $(this).delay(1000).animate({
                            left: '+=1500px'
                        }, 2000)
                    } else {
                        $(this).delay(1000).animate({
                            right: '+=1500px'
                        }, 2000)
                    }
                }
                else {
                    if (caso >= 16) {
                        $(this).delay(1000).animate({
                            top: '+=1500px'
                        }, 2000)
                    }
                    else {
                        $(this).delay(1000).animate({
                            bottom: '+=1500px'
                        }, 2000, () => {
                            clearInterval(intervallo);
                            $('.container').text('');
                            $(`<h2 class='banner'>Hai vinto, vuoi giocare ancora ?</h2>`).appendTo('.container');
                            $('h2').css({
                                marginTop: '50vh'
                            })
                            $(`<button>Facile</button>`).on('click', giocaFacile).appendTo('.container');
                            $(`<button>Difficile</button>`).on('click', giocaDifficile).appendTo('.container');
                            $('h2,button').hide();
                            $('h2,button').show(2000);
                        })
                    }
                }
            })
        }, 1500)
    }


    function aiutoFacile() {
        if (index == 0) {
            alert('seleziona prima una carta');
        } else {
            for (let j = 0; j < 16; j++) {
                if ($(`#${j}`).children().attr('src') == confronto[0] && ($(`#${j}`).attr('id') !== $(casellaConfronto[0]).attr('id'))) {
                    $(`#${j}`).trigger('click');
                }
            }
        }
    }
    function aiutoDifficle() {
        if (index == 0) {
            alert('seleziona prima una carta');
        } else {
            for (let j = 0; j < 32; j++) {
                if ($(`#${j}`).children().attr('src') == confronto[0] && ($(`#${j}`).attr('id') !== $(casellaConfronto[0]).attr('id'))) {
                    $(`#${j}`).trigger('click');
                }
            }
        }
    }


    function giocaFacile() {
        giocaAncora(facile);
    }
    function giocaDifficile() {
        giocaAncora(difficile);
    }


    function giocaAncora(diff) {
        $('.container').text('');
        confronto = [];
        casellaConfronto = [];
        index = 0;
        trovato = 0;
        contatore = 0;
        startGame(diff);
    }

})
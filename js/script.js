var app = new Vue (
    {
        el : '#app',
        data :{
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luis*',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            userFiltered: '',
            userMessage: '',
            activeContact: 0,
            openModal: false,
            msgIndex: '',
            isContentClass: ''
        },
        mounted () {
            this.$refs.focusMe.focus()
        },
        methods: { 
            // collega la colonna di sinistra 
            // con la colonna di destra 
            // tramite un index
            setActiveContact(index) {
                this.activeContact = index;
                this.openModal = false;
                this.$refs.focusMe.focus()
                setTimeout(() => {
                    document.querySelector('.message:last-child').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                },);
                
            },
            // funzione per poter aggiungere un testo
            // solo se viene scritto qualcosa nel input
            addMessage: function(){

                const time = dayjs();
                const dateTimeString = time.format('DD/MM/YYYY HH:mm:ss');
                const arrayMessages = this.contacts[this.activeContact].messages;

                if(this.userMessage.length > 0){
                    arrayMessages.push({
                        date: dateTimeString,
                        text: this.userMessage,
                        status: 'sent'
                    });
                    this.userMessage = '';
                    setTimeout(() => {
                        document.querySelector('.message:last-child').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                    },);
                    let x = this.answerGen();

    
                    setTimeout( () => {
    
                        arrayMessages.push ({
    
                            date: dateTimeString,
                            text: x,
                            status: 'received'
    
                        });

                        setTimeout(() => {
                            document.querySelector('.message:last-child').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        },);
                    }, 1000)
                
                }
            },
            // funzione per filtrare gli utenti 
            filteredContacts() {
                
                this.contacts.forEach((contatto) =>
                {
                    const contattoNameLowerCase = contatto.name.toLowerCase();
                    const userFilteredLowerCase = this.userFiltered.toLowerCase();

                    if( contattoNameLowerCase.includes(userFilteredLowerCase) ) {
                        contatto.visible = true;
                    } else{
                        contatto.visible = false;
                    }
                    console.log(contatto.visible)
                });
                
            },
            answerGen: function() {
                const opt = [
                    'Ok',
                    'Ma sei davvero sicuro?',
                    'E se poi te ne penti?',
                    'Non credevo di farcela',
                    'Incredibile',
                    'Portami al mare',
                    'Ma se Maometto non va alla montagna?',
                    'Vediamo come esce fuori il testo',
                    'Se al improvviso mi partisse un lorem ipsum super random ti arrabbieresti?',
                    'Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura, ch?? la diritta via era smarrita.',
                    'I am Batman'
                  ];
                let x = opt[Math.floor(Math.random() * opt.length)];
                return x;
            },
            showElement: function (index) {
                if (this.openModal === false) {
                    this.openModal = true;
                } else {
                    this.openModal = false;
                }
                this.msgIndex = index;
            },
            deleteMessage: function(activeContact) {
                this.contacts[this.activeContact].messages.splice(activeContact,1);
                this.openModal=false;
                
            },
            lastDateMessage: function(Index) {
                //console.log(newIndex);
                let lastDate = this.contacts[Index].messages.length - 1;
                //console.log(lunghezza);
                if(lastDate == -1){
                    return "Nessun accesso oggi";
                } 
                return this.contacts[Index].messages[lastDate].date;
            },
            changeTheme: function(){
                if(this.isContentClass===''){
                this.isContentClass = 'active'}
                else{
                    this.isContentClass=''
                }
                
            },
            lastTextMessage: function(index) {

                let lastTextMessage = this.contacts[index].messages;

                if (lastTextMessage.length === 0) {
                    return '';
                } else {
                    return lastTextMessage[lastTextMessage.length - 1].text;
                }
                
            }

        }    
    }
)


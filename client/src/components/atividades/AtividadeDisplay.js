import React from 'react'
import AtividadeTable from './AtividadeTable';
import MultiplaEscolha from './multiplaEscolha/MultiplaEscolha';
import CompletarLacunas from './completarLacunas/CompletarLacunas';
import QuestaoAberta from './questaoAberta/QuestaoAberta';

export default class AtividadeDisplay extends React.Component {

    constructor(props){
        super(props)
        this.state={
            rendered:null
        }
    }

    changeCurrentActivitie = (activitie)=> {
        let data = JSON.parse(activitie.jsonAtividade)
        switch (activitie.tipo) {
            case "Múltipla Escolha":
                this.setState({
                    rendered: <MultiplaEscolha
                        key={activitie.id}
                        data={data}
                        pontuacao={activitie.pontuacao}
                        id={activitie.id}
                        testing={false}
                    />
                })
                break;
            case "Completar Lacunas":
                this.setState({
                    rendered: <CompletarLacunas
                        key={activitie.id}
                        data={data}
                        pontuacao={activitie.pontuacao}
                        id={activitie.id}
                    ></CompletarLacunas>
                })
                break;
            case "Questão Aberta":
                this.setState({
                    rendered: <QuestaoAberta
                        key={activitie.id}
                        data={data}
                        pontuacao={activitie.pontuacao}
                        id={activitie.id}
                    ></QuestaoAberta>
                })
                break;
            default:
                break;
        }
    }


    render() {

        return (
            <div>
                <AtividadeTable option='1' onChangeActivitie={this.changeCurrentActivitie}></AtividadeTable>
                {this.state.rendered}
            </div>
        )
    }


}
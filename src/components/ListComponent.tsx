import '../App.css';
import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { colors } from "../App";

export interface IList {
    id: string,
    name: string,
    metaData: string,
    selected: boolean
}

export interface ISearch {
    label: string,
    value: string
}

interface Props {
    provider: IList[],
    searchList?: ISearch[],
    favoriteMode?: boolean,
    totalItems: Number,
    selectedAll?: boolean,
    selectedAllItems?: any,
    selectedItem?: any,
    selectedSearchItems?: any,
}

/**
 * Componente que permite mostrar un listado de elementos, se puede usar de dos modos,
 *
 * favoriteMode: false,(por defecto) listado con buscador integrado, y la opción de marcar items.
 * favoriteMode: true, Permite el borrado de elementos del listado
 */
export class ListComponent extends Component<Props> {

    handlerChangeSelectAll = (event: any) => {
        this.props.selectedAllItems(event.target.checked);
    }

    handlerChangeSelect = (index: number) => (event: any) => {
        this.props.selectedItem(this.props.provider[index], event.target.checked);
    }

    handlerChangeSearch = (event: any) => {
        this.props.selectedSearchItems(event);
    }

    handlerDeleteAllSelect = (event: any) => {
        this.props.selectedAllItems(false);
    }

    handlerDeleteSelect = (index: number) => (event: any) => {
        this.props.selectedItem(this.props.provider[index], false);
    }

    /**
     * Cabecera del listado
     *
     */
    renderResumeList() {
        return (
            <div className='App-list-item'>
                {
                    !this.props.favoriteMode &&
                    <Checkbox onClick={this.handlerChangeSelectAll}
                              checked={this.props.selectedAll}
                    />
                }
                <div className='App-list-item-resume'>
                    <Typography
                        variant="subtitle1"
                        color="primary"
                    >
                        {this.props.totalItems} cities
                    </Typography>
                </div>
                {
                    this.props.favoriteMode &&
                    <div onClick={this.handlerDeleteAllSelect}>
                        <FontAwesomeIcon icon={faTrash} color={colors.secondaryColor}/>
                    </div>
                }
            </div>
        )
    }

    /**
     * Listado de elementos
     *
     * @param provider
     */
    renderList(provider: IList[]) {

        return (
            provider.map( (item: IList, index) => {
            return (
                <div className='App-list-item'  key={index}>
                    {
                        !this.props.favoriteMode &&
                        <Checkbox
                            onClick={this.handlerChangeSelect(index)}
                            checked={item.selected}
                        />
                    }

                    <FontAwesomeIcon icon={faGlobeAsia} size="3x" color={colors.secondaryColor}/>

                    <div className='App-list-item-resume'>
                        <div>
                        {item.name}
                        </div>
                        {item.metaData}
                    </div>
                    {
                        this.props.favoriteMode &&
                        <div onClick={this.handlerDeleteSelect(index)} className='App-list-icon'>
                            <FontAwesomeIcon icon={faTrash} color={colors.secondaryColor}/>
                        </div>
                    }
                </div>
                )
            })

        )
    }

    render() {
        return (
            <Card>
                <CardContent>
                    {
                        !this.props.favoriteMode &&
                        <div>
                            <Select
                                options={this.props.searchList}
                                placeholder="Search by name"
                                isMulti={true}
                                onChange={this.handlerChangeSearch}
                            />
                        </div>
                    }
                    {
                        !this.props.favoriteMode &&
                        < Divider/>
                    }

                    {this.renderResumeList()}

                    <Divider/>

                    {this.renderList(this.props.provider)}

                </CardContent>
            </Card>
            )
    }

}

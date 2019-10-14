import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {IList, ISearch, ListComponent} from "../components/ListComponent";
import citiesOfChina from '../data/cities-of-china.json';

// Tamaño por defecto de la página,
// TODO pasar como propiedad, si queremos hacerlo configurable
const defaultPageSize: number = 20;

// Estructura del JSON de ciudades
interface ICitiesChina {
    id: string,
    name: string,
    chineseName: string
}

interface IState {
    selectedList: IList[],  // Lista de items seleccionados para los favoritos
    completeList: IList[],  // Lista completa de todas las ciudades
    filterList: IList[],    // Lista filtrada, aplicada el combo de búsqueda
    searchList: ISearch[],  // Lista para el combo de búsqueda
    pageSize: number,       // Tamaño de paginación
    filterEnabled?: boolean // Notifica si se está filtrando
    selectedAll?: boolean   // Control del check de todos seleccionados
}

export class MainComponent extends Component {

    state: IState = {
        selectedList: [],
        completeList: [],
        filterList: [],
        searchList: [],
        pageSize: defaultPageSize,
        filterEnabled: false,
        selectedAll: false
    }

    componentDidMount() {

        this.formatChineseData(citiesOfChina.cities);
    }

    /**
     * Parseamos el json de datos, con una lista con todas las ciudades y otra para el combo de búsqeuda
     *
     * @param data listado de ciudades
     */
    formatChineseData = (data: ICitiesChina[]) => {

        let completeList: IList[] = [];
        let searchList: ISearch[] = [];

        data.forEach((city: ICitiesChina) => {
           let item: IList = {
               id: city.id,
               name: city.name,
               metaData: city.chineseName,
               selected: false
           };

           let itemSearch: ISearch = {
               value: city.id,
               label: city.name + ' ('+ city.chineseName+')',
           }

           completeList.push(item);
           searchList.push(itemSearch);
        });

        this.setState({
            selectedList: [],
            completeList: completeList,
            filterList: completeList.slice(0,defaultPageSize),
            searchList,
            pageSize: defaultPageSize,
            filterEnabled: false,
            selectedAll: false
        });
    }

    /**
     * Marcamos o desmarcamos un item
     *
     * @param item elemento sobre el que se ejecuta la acción
     * @param selected true/false si marcamos o desmarcamos
     */
    selectedItemHandler = (item: IList, selected: boolean) => {

        let selectedList: IList[] = this.state.selectedList;

        item.selected = selected;

        if (!selected) {
            let indexToRemove = selectedList.findIndex((it: IList) => item.id === it.id);
            selectedList.splice(indexToRemove,1);
        } else {
            selectedList.push(item);
        }

        this.setState({
            selectedList,
            selectedAll: !selected ? false : selectedList.length === this.state.completeList.length
        });
    }

    /**
     * Marcamos o desmarcamos todos los items
     *
     * @param selected true/false si marcamos o desmarcamos
     */
    selectedAllItemHandler = (selected: boolean) => {

        let completeList: IList[] = this.state.completeList;

        completeList.forEach((item: IList) => {
            item.selected = selected
        });

        this.setState({completeList,
            filterList: completeList.slice(0,this.state.pageSize),
            selectedList: selected ? [...completeList] : [],
            selectedAll: selected
        });
    }

    /**
     * Búsqueda de uno o n items
     *
     * @param searchedItems items a buscar
     */
    selectedSearchItemHandler = (searchedItems: ISearch[]) =>{

        let filterList: IList[] = [];
        let filterEnabled: boolean = true;

        if (searchedItems && searchedItems.length > 0) {

            searchedItems.map( (searchIt: ISearch) => {
                let foundItem: IList | undefined = this.state.completeList.find((item: IList) => {
                    return searchIt.value === item.id;
                });

                if (foundItem) {
                    filterList.push(foundItem);
                }

                return filterList;
            });
        } else { // Reseteo
            let completeList: IList[] = this.state.completeList;

            filterList = completeList.slice(0,this.state.pageSize);
            filterEnabled = false;
        }

        this.setState({filterList, filterEnabled});
    }

    /**
     * Control de los listados para el infinite scroll
     */
    loadItems = () => {

        if (!this.state.filterEnabled) {
            let pageSize: Number = this.state.pageSize + defaultPageSize;
            let filterList: IList[];
            let completeList: IList[] = this.state.completeList;

            filterList = completeList.slice(0,this.state.pageSize);

            this.setState({filterList, pageSize});
        }
    }

    render() {
        return(
            <div id='mainSection' className="App-main">
                <div id='leftSection' className="App-main-section-left">
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadItems}
                        hasMore={true || false}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        <ListComponent provider={this.state.filterList}
                                       selectedItem={this.selectedItemHandler}
                                       selectedAllItems={this.selectedAllItemHandler}
                                       selectedSearchItems={this.selectedSearchItemHandler}
                                       searchList={this.state.searchList}
                                       favoriteMode={false}
                                       selectedAll={this.state.selectedAll}
                                       totalItems={this.state.filterEnabled
                                                    ? this.state.filterList.length
                                                    : this.state.completeList.length
                                       }
                        />
                    </InfiniteScroll>
                </div>
                <div id='rightSection' className="App-main-section-right">

                    <ListComponent provider={this.state.selectedList.slice(0,this.state.pageSize)}
                                   favoriteMode={true}
                                   totalItems={this.state.selectedList.length}
                                   selectedItem={this.selectedItemHandler}
                                   selectedAllItems={this.selectedAllItemHandler}
                    />

                </div>
            </div>
        )
    }
}

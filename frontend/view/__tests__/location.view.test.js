
import LocationView from '../location.view'

// Mockear Leaflet de forma global
global.L = {
    map: jest.fn(() => {
        const mapMock = {
            setView: jest.fn().mockReturnThis(),
            eachLayer: jest.fn(),
            removeLayer: jest.fn(),
            addLayer: jest.fn(),
        }
        return mapMock
    }),
    tileLayer: jest.fn(() => ({
        addTo: jest.fn(),
    })),
    marker: jest.fn(() => ({
        addTo: jest.fn().mockReturnThis(),
        bindPopup: jest.fn().mockReturnThis(),
    })),
}

describe('LocationView', () => {
    let view

    beforeEach(() => {
        view = new LocationView()
        // Mock métodos de BaseView
        view.showTemplate = jest.fn(() => true)
        view.showMessage = jest.fn()

        document.body.innerHTML = `
        <div id="mapa"></div>
        <div id="zona"></div>
        <div id="detalles-tiendas"></div>
        <select id="ciudad"></select>
        <form id="formulario-ubicacion"></form>
    `
    })

    describe('showLocationPage', () => {
        it('debe llamar a showTemplate y luego initMap', () => {
            jest.useFakeTimers()
            const spy = jest.spyOn(view, 'initMap')
            view.showLocationPage()
            jest.runAllTimers()
            expect(view.showTemplate).toHaveBeenCalledWith('plantilla-ubicacion', 'container-principal')
            expect(spy).toHaveBeenCalled()
        })
    })

    describe('initMap', () => {
        it('debe inicializar el mapa si no existe ya', () => {
            view.initMap()
            expect(L.map).toHaveBeenCalledWith('mapa')
            expect(L.tileLayer).toHaveBeenCalled()
            expect(view.map).toBeDefined()
        })

        it('no debe inicializar si el mapa ya existe', () => {
            view.map = 'mapa ya existe'
            console.log = jest.fn()
            view.initMap()
            expect(console.log).toHaveBeenCalledWith('El mapa ya está inicializado')
        })

        it('debe registrar error si no hay #mapa', () => {
            document.getElementById('mapa').remove()
            console.error = jest.fn()
            view.initMap()
            expect(console.error).toHaveBeenCalledWith('No se encontró el elemento del mapa')
        })
    })

    describe('updateZoneOptions', () => {
        it('debe agregar opciones nuevas al selector de zonas', () => {
            const formatSpy = jest.spyOn(view, 'formatZoneName')
            view.updateZoneOptions(['zona-norte', 'zona-sur'])
            const options = document.querySelectorAll('#zona option')
            expect(options.length).toBe(2)
            expect(formatSpy).toHaveBeenCalledWith('zona-norte')
            expect(formatSpy).toHaveBeenCalledWith('zona-sur')
        })

        it('debe mostrar error si #zona no existe', () => {
            document.getElementById('zona').remove()
            console.error = jest.fn()
            view.updateZoneOptions(['centro'])
            expect(console.error).toHaveBeenCalledWith('No se encontró el selector de zona')
        })
    })

    describe('formatZoneName', () => {
        it('debe capitalizar nombres kebab-case', () => {
            expect(view.formatZoneName('zona-norte')).toBe('Zona Norte')
        })
    })

    describe('showStores', () => {
        beforeEach(() => {
            view.map = {
                eachLayer: jest.fn(),
                removeLayer: jest.fn(),
                setView: jest.fn(),
                addLayer: jest.fn()
            }
        })

        it('debe mostrar mensaje si no hay tiendas', () => {
            view.showStores([])
            expect(view.showMessage).toHaveBeenCalledWith('No hay tiendas disponibles en esta zona', 'warning')
        })

        it('debe agregar marcadores y detalles si hay tiendas', () => {
            const tiendas = [{ nombre: 'Tienda 1', direccion: 'Calle 123', horario: '9-6', lat: 4.6, lng: -74.08 }]
            view.showStores(tiendas)
            const detalles = document.querySelectorAll('.tienda-ubicada')
            expect(detalles.length).toBe(1)
            expect(view.map.setView).toHaveBeenCalled()
        })

        it('debe mostrar error si el mapa no está inicializado', () => {
            view.map = null
            console.error = jest.fn()
            view.showStores([{ lat: 1, lng: 1 }])
            expect(console.error).toHaveBeenCalledWith('El mapa no está inicializado')
        })
    })

    describe('setupLocationEvents', () => {
        it('debe asignar manejadores de eventos', () => {
            const changeHandler = jest.fn()
            const searchHandler = jest.fn()
            view.setupLocationEvents(changeHandler, searchHandler)

            document.getElementById('ciudad').dispatchEvent(new Event('change'))
            expect(changeHandler).toHaveBeenCalled()

            document.getElementById('formulario-ubicacion').dispatchEvent(new Event('submit'))
            expect(searchHandler).toHaveBeenCalled()
        })
    })
})

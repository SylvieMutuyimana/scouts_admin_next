import kigali from '../../assets/img/provinces/kigali/kigali.jpg';
import east from '../../assets/img/provinces/east/east.jpg';
import west from '../../assets/img/provinces/west/west.jpg';
import north from '../../assets/img/provinces/north/north.jpg';
import south from '../../assets/img/provinces/south/south.jpg';

export const districts_provinces = {
  Kigali: {
    image: kigali,
    districts: {
      Gasabo: {
        'Sector1': ['cell1', 'cell2'],
        'Sector2': ['cell1', 'cell2'],
        'Sector3': ['cell1', 'cell2'],
      },
      Kicukiro: {
        'Sector4': ['cell1', 'cell2'],
        'Sector5': ['cell1', 'cell2'],
      },
      Nyarugenge: {
        'Sector6': ['cell1', 'cell2'],
        'Sector7': ['cell1', 'cell2'],
        'Sector8': ['cell1', 'cell2'],
        'Sector9': ['cell1', 'cell2'],
      },
    },
  },
  Northern: {
    image: north,
    districts: {
      Burera: {
        'Sector10': ['cell1', 'cell2'],
        'Sector11': ['cell1', 'cell2'],
      },
      Gakenke: {
        'Sector12': ['cell1', 'cell2'],
        'Sector13': ['cell1', 'cell2'],
        'Sector14': ['cell1', 'cell2'],
      },
      Gicumbi: {
        'Sector15': ['cell1', 'cell2'],
      },
      Musanze: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Rulindo: {
        'Sector18': ['cell1', 'cell2'],
      },
    },
  },
  Southern: {
    image: south, 
    districts: {
      Gisagara: {
        'Sector10': ['cell1', 'cell2'],
        'Sector11': ['cell1', 'cell2'],
      },
      Huye: {
        'Sector12': ['cell1', 'cell2'],
        'Sector13': ['cell1', 'cell2'],
        'Sector14': ['cell1', 'cell2'],
      },
      Kamonyi: {
        'Sector15': ['cell1', 'cell2'],
      },
      Muhanga: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Nyamagabe: {
        'Sector18': ['cell1', 'cell2'],
      },
      Nyanza: {
        'Sector15': ['cell1', 'cell2'],
      },
      Nyaruguru: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Ruhango: {
        'Sector18': ['cell1', 'cell2'],
      },
    },
  },
  Eastern:{
    image: east, 
    districts: {
      Bugesera: {
        'Sector18': ['cell1', 'cell2'],
      },
      Gatsibo: {
        'Sector15': ['cell1', 'cell2'],
      },
      Kayonza: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Kirehe: {
        'Sector18': ['cell1', 'cell2'],
      },
      Ngoma: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Nyagatare: {
        'Sector18': ['cell1', 'cell2'],
      },      
      Rwamagana: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
    },
  },
  Western:{
    image: west, 
    districts: {
      Karongi: {
        'Sector18': ['cell1', 'cell2'],
      },
      Ngororero: {
        'Sector15': ['cell1', 'cell2'],
      },
      Nyabihu: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Nyamasheke: {
        'Sector18': ['cell1', 'cell2'],
      },
      Rubavu: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      },
      Rusizi: {
        'Sector18': ['cell1', 'cell2'],
      },      
      Rutsiro: {
        'Sector16': ['cell1', 'cell2'],
        'Sector17': ['cell1', 'cell2'],
      }
    }
  }
};

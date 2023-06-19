const { Activity, conn } = require('../src/db');//importo el modelo y la conexion para trabajar con la DB

describe('Activity model', () => { //bloque de descripcion para agrupar las pruebas del modelo activity
    beforeAll((done) => {
        conn.authenticate()//antes que nada autenticamos la conexion a la DB
          .then(() => {
            console.log('Connection has been established successfully.');
            done();
          })
          .catch((err) => {
            console.error('Unable to connect to the database:', err);
            done(err);
          });
      });
  describe('Validators', () => { //aqui se agrupan las pruebas de validacion de modelo
    beforeEach(() => Activity.sync({ force: true })); //sincronizamos con el modelo activity y el force true borra la tabla y la inicia nuevamente
    describe('name', () => { //bloque descriptivo para prueba con name
      it('should throw an error if name is null', (done) => {
        Activity.create({}) //aqui creo una actividad sin nombre (null) y esperamos recibir un error, done es para finalizar la prueba
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', async() => { //finalmente se prueba con un nombre valido, ingresamos tambien todos los datos obligatorios ya que sequelize tira error si no lo hacemos
       await Activity.create({ name: 'Hiking',difficulty:'3',duration:'5',season:'Autumn'});
      });
    });
  });
});
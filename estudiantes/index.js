const express = require('express')
const algo = require('./algo')

const port = 3000     // En clase 5000, pero me daba problemas de acceso en mi maquina...

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = []

//const estudiantes = [
//  {
//    nombre: "José",
//    apellido: "Vázquez",
//    dni: 90909090,
//    edad: 30
//  }
//]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// AGREGA estudiante con validación
app.post(route, (req, res) => {         // En clase header
  const estudiante = req.body         // En clase
  const existe = estudiantes.find((est) => {         // En clase
    return est.dni == estudiante.dni         // En clase
  })
  // Se solicitó: Verificar duplicado de registro en clase
  // Si no existe estudiante, entonces agrega:
  if (!existe) {
    // grabado = estudiantes.save(estudiante)
    // if grabado...
    // try {
    //   baseDeDatos.save(estudiante)
    // } catch (ErrorDuplicacion) {
    //   res.status(409)
    //   res.send()
    // }
    estudiantes.push(estudiante)    // En clase
    res.status(200)    // En clase
    res.json(`El estudiante ${estudiante.nombre, estudiante.apellido}, fue agregado correctamente.`)    // En clase
  } else {    // En clase
    res.status(409)    // En clase
    res.send()    // En clase
  }
})



// ELIMINA estudiante, si existe, por DNI:
app.delete(route, (req, res) => {         // En clase header
  const estudiante = req.body;

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
    
  const pos = estudiantes.indexOf(existe);
  estudiantes.splice(pos, 1);
  // Si no existe estudiante, elimina
    if(existe){
    res.status(200)
    res.json(estudiante)
    }else{
    res.status(409)
    res.send()
    }
})



//MODIFICA/Actualiza un estudiante:
app.put(route, (req, res) => {        // En clase header
  const estudiante = req.body

  const e = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  const pos = estudiantes.indexOf(e)
  estudiantes[pos] = estudiante;

  if(e){
    res.status(200)
    res.json(estudiantes[pos])
  }
  else {
    res.status(409)
    res.send()
  }
})


// CONSULTA/TRAE TODOS los estudiantes:
app.get(route, (req, res) => {
  res.json(estudiantes)
})



// CONSULTA estudiante por DNI:
app.get(`${route}/:dni`, (req, res) => {         // En clase header
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  if(existe){
    res.status(200)
    res.json(existe)
  }
  else {
    res.status(409)
    res.send()
  }
})



// CONSULTA estudiante por rango de EDAD:
app.get(`${route}/edad/:rango`, (req, res) => {        // En clase header
  const estudiante = req.body
  const lista =[]
  estudiantes.forEach(i => {
    if(estudiante.edad == i.edad){
      lista.push(i)
    }
  });
 
  if(lista.length){
    res.status(200)
    res.json(lista)
  }
  else {
    res.status(409)
    res.send()
  }
})

app.get('/', function(req, res){
  res.send("Hello world from Express!!");
});

app.listen(port, () => {
  console.log("Escuchando puerto 3000")
})      // El 5000 me daba problemas de acceso en mi maquina...

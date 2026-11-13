# Práctica: Git-flow e Integración Continua

Ingeniería de Software, I-2026

---

## Objetivo

En esta actividad usted practicará un flujo básico de **Git-flow** usando un sistema pequeño.
La idea es simular el paso de una funcionalidad por las ramas:

```text
feature → develop → release → main
```

Además, al final deberá responder algunas preguntas directamente en este mismo archivo `README.md`.

**Duración estimada:** 20 a 30 minutos.

---

## Sistema base

El repositorio contiene un sistema pequeño para calcular descuentos.

Estructura esperada del proyecto:

```text
.
├── package.json
├── src
│   └── descuentos.js
├── test
│   └── descuentos.test.js
└── README.md
```

El archivo principal es:

```text
src/descuentos.js
```

La función principal recibe el precio de un producto y el tipo de cliente, y retorna el precio final con descuento.

Ejemplo:

```js
calcularPrecioFinal(10000, "normal")
```

---

## Pre-condición

Clonar el repositorio y entra a la carpeta del proyecto:

```bash
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_REPOSITORIO
```

Instala las dependencias:

```bash
npm install
```

Ejecuta las pruebas:

```bash
npm test
```

Antes de modificar el código, verifique que las pruebas iniciales pasen correctamente.

---

## Parte 1: preparar Git-flow

Primero, asegurar de estar en la rama principal:

```bash
git checkout main
```

Crear la rama `develop` a partir de `main`:

```bash
git checkout -b develop
git push -u origin develop
```

La rama `main` representa el código en producción.
La rama `develop` representa el código en desarrollo.

---

## Parte 2: crear una feature branch

Crea una rama para implementar una nueva funcionalidad:

```bash
git checkout -b feature/descuento-estudiante develop
```

Ahora implementa la siguiente funcionalidad:

> Si el tipo de cliente es `"estudiante"`, el sistema debe aplicar un descuento del 15%.

Ejemplo esperado:

```js
calcularPrecioFinal(10000, "estudiante")
```

Resultado esperado:

```js
8500
```

Debe modificar el archivo:

```text
src/descuentos.js
```

También debe agregar o completar una prueba en:

```text
test/descuentos.test.js
```

Ejecuta las pruebas:

```bash
npm test
```

Cuando todo funcione, realice un commit:

```bash
git add .
git commit -m "Agrega descuento para estudiantes"
```

---

## Parte 3: integrar la feature en develop

Vuelva a la rama `develop`:

```bash
git checkout develop
```

Integre la rama de funcionalidad usando `--no-ff`:

```bash
git merge --no-ff feature/descuento-estudiante -m "Integra feature descuento estudiante"
```

El parámetro `--no-ff` fuerza la creación de un commit de merge.
Esto permite dejar registrado que la funcionalidad fue desarrollada en una rama separada.

Elimine la rama local de la funcionalidad:

```bash
git branch -d feature/descuento-estudiante
```

Suba los cambios:

```bash
git push origin develop
```

---

## Parte 4: crear una release branch

Cree una rama de release desde `develop`:

```bash
git checkout -b release/1.0 develop
```

En esta rama, realiza una corrección menor en el archivo `README.md`.
Por ejemplo, agrega una breve descripción del sistema en la siguiente sección:

### Descripción del sistema

Escribe aquí una descripción breve del sistema:

> Respuesta del estudiante: Sistema en Node.js que calcula el precio final de un producto según el tipo de cliente. Los clientes de tipo "estudiante" reciben un 15% de descuento; el resto paga el precio normal.

Luego realice un commit:

```bash
git add README.md
git commit -m "Actualiza documentación para release 1.0"
```

---

## Parte 5: publicar la release en main

Cambie a la rama `main`:

```bash
git checkout main
```

Integre la release:

```bash
git merge --no-ff release/1.0 -m "Publica release 1.0"
```

Cree una etiqueta para la versión:

```bash
git tag -a 1.0 -m "Versión 1.0"
```

Suba los cambios y la etiqueta:

```bash
git push origin main
git push origin 1.0
```

---

## Parte 6: devolver cambios a develop

Las correcciones hechas en la rama `release/1.0` también deben volver a `develop`.

```bash
git checkout develop
git merge --no-ff release/1.0 -m "Integra release 1.0 en develop"
```

Elimine la rama de release:

```bash
git branch -d release/1.0
```

Suba los cambios:

```bash
git push origin develop
```

---

## Parte 7: revisar el historial

Ejecute:

```bash
git log --oneline --graph --all
```

Observe el historial y verifique que aparezcan las ramas, los commits y los merges realizados durante la práctica.

---

## Preguntas

Responda las siguientes preguntas directamente en este archivo `README.md`.

### 1. ¿Cuál es la diferencia entre `main` y `develop` en Git-flow?

Respuesta: `main` contiene solo código estable y publicado (producción); cada commit en main corresponde a una versión etiquetada. `develop` es la rama de integración donde se juntan las features terminadas que aún no se publican. Así se separa lo que está en producción de lo que está en desarrollo.

---

### 2. ¿Por qué la funcionalidad se desarrolló en una rama `feature` y no directamente en `main`?

Respuesta: Para aislar el trabajo en curso: si la funcionalidad queda incompleta o tiene errores, no rompe `main` (producción) ni afecta a otros desarrolladores. Además permite revisarla y probarla antes de integrarla, y descartarla sin impacto si es necesario.

---

### 3. ¿Qué hace el comando `git merge --no-ff`?

Respuesta: Obliga a crear un commit de merge aunque Git pudiera hacer fast-forward. Ese commit deja registrado en el historial que la funcionalidad se desarrolló en una rama separada y agrupa todos sus commits.

---

### 4. ¿Qué diferencia habría si Git hiciera un merge con fast-forward?

Respuesta: Con fast-forward Git solo movería el puntero de `develop` al último commit de la feature, dejando un historial lineal. Se perdería la evidencia de que existió la rama y sería más difícil revertir la funcionalidad completa, porque no habría un único commit de merge que revertir.

---

### 5. Después del merge, ¿los commits hechos en `feature/descuento-estudiante` quedan en el historial de `develop`?

Respuesta: Sí. El merge no elimina commits: quedan alcanzables desde `develop`. `git branch -d` solo borra el puntero (nombre) de la rama, no sus commits, que siguen visibles en `git log --graph`.

---

### 6. ¿Qué rol cumple una rama `release`?

Respuesta: Preparar una versión para publicarla: se congelan las nuevas funcionalidades y solo se hacen ajustes menores (documentación, corrección de bugs, número de versión), mientras `develop` sigue recibiendo features. Luego se integra en `main` con un tag y se devuelve a `develop` para no perder las correcciones.

---

### 7. ¿Es posible usar Integración Continua con Git-flow? Justifica brevemente.

Respuesta: Sí. Se configura un pipeline (por ejemplo GitHub Actions) que ejecute `npm test` en cada push o pull request hacia `develop`, `release/*` y `main`, bloqueando el merge si las pruebas fallan. El único matiz es que las ramas feature deben ser cortas para integrar frecuentemente, que es la idea central de CI.

---

## Generar evidencia 

Ejecuta el siguiente comando en PowerShell (Windows) o Bash (Linux), dentro de la carpeta del repositorio:

Windows:
```powershell
powershell -ExecutionPolicy Bypass -File .\generar-evidencia.ps1
```
Linux:
```bash
chmod +x generar-evidencia.sh
./generar-evidencia.sh```
```

En campus virtual subir:

```text
1. Archivo evidencia_gitflow.txt.
2. README.md con las respuestas completas.
```

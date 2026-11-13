const assert = require("assert");
const { calcularTotal, calcularPrecioFinal } = require("../src/descuentos");

assert.strictEqual(calcularTotal(100, 20), 80);
assert.strictEqual(calcularTotal(50, 0), 50);

assert.strictEqual(calcularPrecioFinal(10000, "estudiante"), 8500);
assert.strictEqual(calcularPrecioFinal(10000, "normal"), 10000);
assert.throws(() => calcularPrecioFinal(-1, "estudiante"));

console.log("Tests ejecutados correctamente");

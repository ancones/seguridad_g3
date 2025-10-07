## 📌 **Áreas comunes en empresas de telecomunicaciones móviles**

Las áreas representan las divisiones funcionales de la empresa donde se generan o gestionan solicitudes.

### Áreas típicas:

1. **Atención al Cliente**
2. **Facturación**
3. **Técnico/Soporte Técnico**
4. **Ventas**
5. **Postventa**
8. **Gestión de Dispositivos**

---

## 📌 **Tipos comunes de solicitudes por área**

Cada tipo de solicitud representa una acción o trámite que el usuario desea iniciar.

### Ejemplos por área:

#### 1. **Atención al Cliente**

* Revisión de contrato
* Solicitud de cambio de plan

#### 2. **Facturación**

* Reclamo por cargo indebido
* Solicitud de factura electrónica
* Detalle de consumo mensual

#### 3. **Técnico/Soporte Técnico**

* Reporte de falla en la red
* Sin señal o cobertura
* Problemas con datos móviles

#### 4. **Ventas**

* Solicitud de nuevo plan postpago
* Compra de dispositivo
* Activación de línea adicional

#### 5. **Postventa**

* Devolución de equipo
* Garantía de dispositivo
* Solicitud de reparación

#### 6. **Gestión de Dispositivos**

* Reporte de IMEI robado
* Solicitud de desbloqueo de equipo

---

## 📌 **Ejemplos de solicitudes en formato conceptual**

```json
{
    "area": "Atención al Cliente",
    "tipo_solicitud": "Solicitud de cambio de plan",
    "estado": "Pendiente",
    "descripcion": "El cliente desea cambiar de su plan actual a un plan ilimitado con mayor capacidad de datos."
}
```

```json
{
    "area": "Facturación",
    "tipo_solicitud": "Reclamo por cargo indebido",
    "estado": "En proceso",
    "descripcion": "El cliente reporta un cobro extra en su última factura que no corresponde a ningún servicio contratado."
}
```

```json
{
    "area": "Técnico/Soporte Técnico",
    "tipo_solicitud": "Reporte de falla en la red",
    "estado": "Escalada",
    "descripcion": "El cliente no tiene señal desde hace 2 días en una zona urbana con buena cobertura."
}
```

```json
{
    "area": "Ventas",
    "tipo_solicitud": "Compra de dispositivo",
    "estado": "Resuelta",
    "descripcion": "El cliente ha solicitado comprar un dispositivo Samsung Galaxy S22 con financiamiento."
}
```

```json
{
    "area": "Portabilidad",
    "tipo_solicitud": "Portabilidad entrante",
    "estado": "Cerrada",
    "descripcion": "El cliente solicitó portar su línea desde otro operador a nuestra red, trámite completado exitosamente."
}
```

```json
{
    "area": "Gestión de Dispositivos",
    "tipo_solicitud": "Reporte de IMEI robado",
    "estado": "En espera de información",
    "descripcion": "El cliente solicita bloquear su equipo tras un robo, se requiere copia de la denuncia policial."
}
```

```json
{
    "area": "Postventa",
    "tipo_solicitud": "Garantía de dispositivo",
    "estado": "Pendiente",
    "descripcion": "El cliente reporta fallas en el altavoz del dispositivo adquirido hace 3 meses."
}
```


---
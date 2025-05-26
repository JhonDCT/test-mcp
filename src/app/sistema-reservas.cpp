#include <iostream>
#include <string>
#include <vector>
#include <ctime>

using namespace std;

class MovCtaBancaria
{
private:
    string fecha;
    string documento;
    float abono;
    float cargo;

public:
    ~MovCtaBancaria() {}

    MovCtaBancaria(
        string fecha,
        string documento,
        float abono,
        float cargo)
    {
        this->fecha = fecha;
        this->documento = documento;
        this->abono = abono;
        this->cargo = cargo;
    }

    string getFecha() { return fecha; }
    string getDocumento() { return documento; }
    float getAbono() { return abono; }
    float getCargo() { return cargo; }

    void setFecha(string fecha) { this->fecha = fecha; }
    void setDocumento(string documento) { this->documento = documento; }
    void setAbono(float abono) { this->abono = abono; }
    void setCargo(float cargo) { this->cargo = cargo; }

    void MostrarDatos()
    {
        cout << "----------------------------------------\n";
        cout << "Fecha: " << fecha << endl;
        cout << "Documento: " << documento << endl;
        cout << "Abono: " << abono << endl;
        cout << "Cargo: " << cargo << endl;
    }
};

class CtaBancaria
{
private:
    string nroCtaBancaria;
    string nombres;
    string direccion;
    vector<MovCtaBancaria> movimientos;

public:
    CtaBancaria() {}

    ~CtaBancaria() {}

    CtaBancaria(
        string nroCtaBancaria,
        string nombres,
        string direccion,
        vector<MovCtaBancaria> movimientos)
    {
        this->nroCtaBancaria = nroCtaBancaria;
        this->nombres = nombres;
        this->direccion = direccion;
        this->movimientos = movimientos;
    }

    string getNroCtaBancaria() { return nroCtaBancaria; }
    string getNombres() { return nombres; }
    string getDireccion() { return direccion; }
    vector<MovCtaBancaria> getMovimientos() { return movimientos; }

    void setNroCtaBancaria(string nroCtaBancaria) { this->nroCtaBancaria = nroCtaBancaria; }
    void setNombres(string nombres) { this->nombres = nombres; }
    void setDireccion(string direccion) { this->direccion = direccion; }
    void setMovimientos(vector<MovCtaBancaria> movimientos) { this->movimientos = movimientos; }

    void ingresarDatos()
    {
        string numeroCuenta, nombres, direccion;
        cout << "Ingrese el numero de cuenta: ";
        cin >> numeroCuenta;
        cout << "Ingrese los nombres: ";
        cin >> nombres;
        cout << "Ingrese la direccion: ";
        cin >> direccion;

        this->nroCtaBancaria = numeroCuenta;
        this->nombres = nombres;
        this->direccion = direccion;
    }

    void depositos()
    {
        cout << "Ingrese fecha: ";
        string fecha;
        cin >> fecha;
        cout << "Ingrese el documento: ";
        string documento;
        cin >> documento;
        cout << "Ingrese el abono: ";
        float abono;
        cin >> abono;

        MovCtaBancaria movimiento(fecha, documento, abono, 0);

        movimientos.push_back(movimiento);
    }

    void retiros()
    {
        cout << "Ingrese fecha: ";
        string fecha;
        cin >> fecha;
        cout << "Ingrese el documento: ";
        string documento;
        cin >> documento;
        cout << "Ingrese el cargo: ";
        float cargo;
        cin >> cargo;

        MovCtaBancaria movimiento(fecha, documento, 0, cargo);

        movimientos.push_back(movimiento);
    }

    void mostrarSaldos()
    {
        float saldo = 0;
        for (auto movimiento : movimientos)
        {
            saldo += movimiento.getAbono();
            saldo -= movimiento.getCargo();
        }
        cout << "Saldo actual: " << saldo << endl;
    }

    void mostrarMovimientos()
    {
        cout << "\nFecha       Documento Abono     Cargo\n";
        cout << "----------------------------------------\n";
        for (auto mov : movimientos)
        {
            mov.MostrarDatos();
        }
        cout << "----------------------------------------\n";
    }
};

int main()
{
    do
    {
        cout << ":::::::::: MENU :::::::::" << endl;
        cout << "1. Ingresar datos" << endl;
        cout << "2. Depositos" << endl;
        cout << "3. Retiros" << endl;
        cout << "4. Mostrar saldos" << endl;
        cout << "5. Mostrar movimientos" << endl;
        cout << "6. Salir" << endl;
        cout << "Seleccione una opcion: ";

        int opcion;
        cin >> opcion;
        if (opcion < 1 || opcion > 6)
        {
            cout << "Opcion no valida. floatente de nuevo: ";
            continue;
        }

        CtaBancaria ctaBancaria("123456789", "Juan Perez", "Av. Peru 123", vector<MovCtaBancaria>());

        switch (opcion)
        {
        case 1:
        {
            ctaBancaria.ingresarDatos();
            break;
        }
        case 2:
        {
            ctaBancaria.depositos();
            break;
        }
        case 3:
        {
            ctaBancaria.depositos();
            break;
        }
        case 4:
        {
            ctaBancaria.mostrarSaldos();
            break;
        }
        case 5:
        {
            ctaBancaria.mostrarMovimientos();
            break;
        }
        case 6:
        {
            cout << "Saliendo del programa..." << endl;
            return 0;
        }
        }
    } while (true);

    return 0;
}
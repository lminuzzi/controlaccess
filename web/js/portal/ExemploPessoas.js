var firstNames = ["Luciano", "Leandro", "Ubirajara", "Aldiocir", "Ana Maria", "Cesar Augusto", "Henrique", "Jose", "Karine", "Fernando"],
        lastNames = ["Minuzzi", "Sacchet", "Petri", "Vecchia", "da Rocha", "Moura", "Lemos", "Gomes", "dos Santos", "da Silva"],
        cities = ["Santiago", "Santa Maria", "Cruz Alta", "Porto Alegre", "São Paulo", "Restinga Seca", "Uruguaiana", "São Borja", "Alegrete", "Jaguari"],
        cargos = ["Civil", "Tenente", "Coronel", "Major", "Cabo", "Soldado", "Sargento", "General"],
        presenca = ["Presente", "Ausente"],
        datas = ["01/07/2013", "04/07/2013", "06/07/2013", "10/07/2013", "12/07/2013", "14/07/2013", "18/07/2013", "24/07/2013"],
        horas = ["09:00", "10:00", "11:00", "13:30", "15:30", "16:00", "16:30", "17:00"],
        birthDates = [new Date("1948/12/08"), new Date("1952/02/19"), new Date("1963/08/30"), new Date("1937/09/19"), new Date("1955/03/04"), new Date("1963/07/02"), new Date("1960/05/29"), new Date("1958/01/09"), new Date("1985/09/10"), new Date("1966/03/27")];

function createRandomData(count) {
    var data = [],
            now = new Date();
    for (var i = 0; i < count; i++) {
        var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
                lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
                city = cities[Math.floor(Math.random() * cities.length)],
                cargo = cargos[Math.floor(Math.random() * cargos.length)],
                presente = presenca[Math.floor(Math.random() * presenca.length)],
                dia = datas[Math.floor(Math.random() * datas.length)],
                hora = horas[Math.floor(Math.random() * horas.length)],
                birthDate = birthDates[Math.floor(Math.random() * birthDates.length)],
                age = now.getFullYear() - birthDate.getFullYear();

        data.push({
            Id: i + 1,
            FirstName: firstName,
            LastName: lastName,
            City: city,
            Cargo: cargo,
            Dia: dia,
            Hora: hora,
            Presente: presente,
            BirthDate: birthDate,
            Age: age
        });
    }
    return data;
}

function generatePeople(itemCount, callback) {
    var data = [],
            delay = 25,
            interval = 500,
            starttime;

    var now = new Date();
    setTimeout(function() {
        starttime = +new Date();
        do {
            var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
                    lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
                    city = cities[Math.floor(Math.random() * cities.length)],
                    cargo = cargos[Math.floor(Math.random() * cargos.length)],
                    presente = presenca[Math.floor(Math.random() * presenca.length)],
                    dia = datas[Math.floor(Math.random() * datas.length)],
                    hora = horas[Math.floor(Math.random() * horas.length)],
                    birthDate = birthDates[Math.floor(Math.random() * birthDates.length)],
                    age = now.getFullYear() - birthDate.getFullYear();

            data.push({
                Id: data.length + 1,
                FirstName: firstName,
                LastName: lastName,
                City: city,
                Cargo: cargo,
                Dia: dia,
                Hora: hora,
                Presente: presente,
                BirthDate: birthDate,
                Age: age
            });
        } while(data.length < itemCount && +new Date() - starttime < interval);

        if (data.length < itemCount) {
            setTimeout(arguments.callee, delay);
        } else {
            callback(data);
        }
    }, delay);
}

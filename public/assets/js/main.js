document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.querySelector('#loginForm');
    const formRegister = document.querySelector('#registerForm');
    const btnLogout = document.querySelector('#btnLogout');
    const btnEliminar = document.querySelector('#btnEliminar');
    const btnActualizar = document.querySelector('#btnActualizar');

    const login = (email, password) =>{
        axios({
            method: 'post',
            url: `/login`,
            data: {
                email,
                password
            }
        })
        .then(res => {
            const { data , message } = res.data;
            if(data.token){
                localStorage.setItem('token', JSON.stringify(`${data.token}`));
                window.location.href = `/admin/skaters`;
            }else{
                Swal.fire({
                    icon: "warning",
                    title: 'Login',
                    text: message
                  });
            }
            
        });
    }


    const logOut = ()=> {
        axios({
            method: 'post',
            url: `/login/out`,
        })
        .then(res => {
            window.location.href = `/`;
        })
    }

    const eliminarSkater = async (id)=>{
        try{
            const response = await axios({
              method: 'delete',
              url: `/api/v1/skater/`,
              params: {
                id
              }
            }
          );
          window.location.href = `/admin/skaters`;

          }catch(err){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message
            });
          }
    }


    const editarSkater = async (id, nombre, password, passwordRepeat, anos_experiencia, especialidad)=>{
        
        if(password!==passwordRepeat){
            Swal.fire({
                icon: "error",
                title: "Login",
                text: 'Las contraseñas no coinciden.'
              });
        }else{
            try{
                const response = await axios({
                method: 'put',
                url: `/api/v1/skater/`,
                data: {
                    id, 
                    nombre, 
                    password, 
                    anos_experiencia,
                    especialidad
                }
                }
            );
            window.location.href = `/admin/skaters`;
        }catch(err){
            //console.log(err);
        }
    }
    }

    if(btnActualizar){
        btnActualizar.addEventListener('click',(e)=>{
            e.preventDefault();
            const nombre = document.querySelector('#updateNombre').value;
            const password = document.querySelector('#updatePassword').value;
            const passwordRepeat = document.querySelector('#updatePasswordRepeat').value;
            const aniosExperiencia = document.querySelector('#updateAniosExp').value;
            const especialidad= document.querySelector('#updateEspecialidad').value;      
            const id = e.target.getAttribute("data-id");
            editarSkater(id, nombre, password, passwordRepeat, aniosExperiencia, especialidad);
        })
    }

    if(btnEliminar){
        btnEliminar.addEventListener('click',(e)=>{
            e.preventDefault();
            const id = e.target.getAttribute("data-id");
            eliminarSkater(id);
        })
    }

    if(btnLogout){
        btnLogout.addEventListener('click',(e)=>{
            e.preventDefault();
            logOut();
        })
    }

    if(formRegister){
    formRegister.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const email = document.querySelector('#registerEmail').value;
        const nombre = document.querySelector('#registerNombre').value;
        const password = document.querySelector('#registerPassword').value;
        const passwordRepeat = document.querySelector('#registerPasswordRepeat').value;
        const anosExperiencia = document.querySelector('#registerAniosExp').value;
        const especialidad= document.querySelector('#registerEspecialidad').value;
        const fotoInput = document.querySelector('#registerFotoFile');
        const foto = fotoInput.files[0];

        const formData = new FormData();
        formData.append('email',email);
        formData.append('nombre',nombre);
        formData.append('password',password);
        formData.append('anos_experiencia',anosExperiencia);
        formData.append('especialidad',especialidad);
        formData.append('foto',foto);

        if(password!=passwordRepeat){
            Swal.fire({
                icon: "error",
                title: 'Login',
                text: 'Las contraseñas no coinciden.'
              });
        }else{
       /* const response = await fetch('/register', {
            method: 'POST',
            body: formData
          });*/
        
        axios({
            method: 'post',
            url: `/register`,
            data: formData
        })
        .then(res => {
            if(res.data){
                window.location.href = `/`;
            }else{
                Swal.fire({
                    icon: "error",
                    title: 'Login',
                    text: 'Usuario o contraseña incorrectos.'
                  });
            }
            
        });
    }

    })};

    if(formLogin){
    formLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
        const email = document.querySelector('#loginEmail').value;
        const password = document.querySelector('#loginPass').value;
        login(email, password);
    })};


    const setStatus = async (id)=>{
        axios({
            method: 'put',
            url: `/api/v1/skater/status`,
            data: {
                id
            }
        })
        .then(res => {
            //console.log(res.data);
        });
    }

    const agregarEventoABotones = () => {

        const checksEdir = document.querySelectorAll("[id*='chkStatus-']");

        if(checksEdir){
            checksEdir.forEach((check) => {
                check.addEventListener("click", () => {
                    const id = check.getAttribute("data-id");
                    setStatus(id);
                });
            });
        }

        const botonesUpdate = document.querySelectorAll("[id*='edtSkt-']");
        
        if(botonesUpdate){
            botonesUpdate.forEach((boton) => {
                boton.addEventListener("click", () => {
                    const id = boton.getAttribute("data-id");
                    window.location.href = `/admin/skater/edit?id=${id}`;
                });
            });
        }

   };
    agregarEventoABotones();
});
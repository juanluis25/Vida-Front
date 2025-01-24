import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona/persona.service';
import { Persona } from '../../models/Persona';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-personas',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-personas.component.html',
  styleUrl: './editar-personas.component.css'
})
export class EditarPersonasComponent implements OnInit{

  personaForm: FormGroup;
  personaId: number | null = null;

  estadoCivilOpciones = [
    {id: 'Soltero(a)', nombre: 'Soltero(a)'},
    {id: 'Casado(a)', nombre: 'Casado(a)'},
    {id: 'Divorciado(a)', nombre: 'Divorciado(a)'},
    {id: 'Viudo(a)', nombre: 'Viudo(a)'},
    {id: 'Unión Libre', nombre: 'Unión Libre'},
  ];

  constructor(
    private personaService: PersonaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidopaterno: ['', Validators.required],
      apellidomaterno: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0)]],
      telefono: ['', Validators.required],
      estadocivil: ['', Validators.required],
      comosupistedeiglesia: ['', Validators.required],
      colonia: ['', Validators.required],
      nombrevoluntario: ['', Validators.required],
      condicionvisita: ['', Validators.required],
      grupopequeñointeres: ['', Validators.required],
      oraciondefe: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el id de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personaId = +id; // Convertir a número
      this.cargarPersona(this.personaId);
    }
  }

  cargarPersona(id: number): void {
    this.personaService.get(id).subscribe({
      next: (persona) => {
        // Llenar el formulario con los datos de la persona
        this.personaForm.patchValue(persona);
      },
      error: (err) => {
        console.error('Error al cargar la persona', err);
      }
    });
  }

  actualizarPersona(): void {
    if (this.personaForm.valid && this.personaId) {
      const updatedPersona: Persona = {
        id: this.personaId,
        ...this.personaForm.value
      };

      this.personaService.update(this.personaId, updatedPersona).subscribe({
        next: (response) => {
          console.log('Persona actualizada', response);
          this.router.navigate(['/ver-personas']);  // Redirigir al listado de personas
        },
        error: (err) => {
          console.error('Error al actualizar la persona', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  overview: string;
  technologies: string[];
  project_link: string;
  github_link: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string>('');
  const { toast } = useToast();

  // Form state for project
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    overview: '',
    technologies: '',
    project_link: '',
    github_link: '',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
    fetchCurrentResume();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive"
      });
    } else {
      setProjects(data || []);
    }
  };

  const fetchCurrentResume = async () => {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'resume_url')
      .single();

    if (!error && data) {
      setCurrentResumeUrl(data.value);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;

    try {
      // Upload file to storage
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `resume.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Save URL to database
      const { error: dbError } = await supabase
        .from('admin_settings')
        .upsert({
          key: 'resume_url',
          value: publicUrl
        });

      if (dbError) throw dbError;

      setCurrentResumeUrl(publicUrl);
      setResumeFile(null);
      toast({
        title: "Success",
        description: "Resume uploaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim())
      };

      if (isEditing && selectedProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', selectedProject.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Project updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Project created successfully"
        });
      }

      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      overview: project.overview,
      technologies: project.technologies.join(', '),
      project_link: project.project_link,
      github_link: project.github_link,
      featured: project.featured
    });
    setIsEditing(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setProjectForm({
      title: '',
      description: '',
      overview: '',
      technologies: '',
      project_link: '',
      github_link: '',
      featured: false
    });
    setSelectedProject(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {isEditing ? 'Edit Project' : 'Add New Project'}
                  {isEditing && (
                    <Button onClick={resetForm} variant="outline" size="sm">
                      Cancel
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="technologies"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Input
                      id="description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="overview">Detailed Overview</Label>
                    <Textarea
                      id="overview"
                      value={projectForm.overview}
                      onChange={(e) => setProjectForm({...projectForm, overview: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project_link">Project Link</Label>
                      <Input
                        id="project_link"
                        type="url"
                        value={projectForm.project_link}
                        onChange={(e) => setProjectForm({...projectForm, project_link: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github_link">GitHub Link</Label>
                      <Input
                        id="github_link"
                        type="url"
                        value={projectForm.github_link}
                        onChange={(e) => setProjectForm({...projectForm, github_link: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="featured">Featured Project</Label>
                  </div>

                  <Button type="submit" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {isEditing ? 'Update Project' : 'Add Project'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditProject(project)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteProject(project.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">{tech}</Badge>
                        ))}
                        {project.featured && (
                          <Badge variant="default">Featured</Badge>
                        )}
                      </div>

                      <div className="flex gap-4 text-sm">
                        {project.project_link && (
                          <a href={project.project_link} target="_blank" rel="noopener noreferrer" 
                             className="flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </a>
                        )}
                        {project.github_link && (
                          <a href={project.github_link} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-1 text-primary hover:underline">
                            <ExternalLink className="w-3 h-3" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload New Resume</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleResumeUpload}
                    disabled={!resumeFile}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Resume
                  </Button>
                </div>

                {currentResumeUrl && (
                  <div className="space-y-2">
                    <Label>Current Resume</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => window.open(currentResumeUrl, '_blank')}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        View Current Resume
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
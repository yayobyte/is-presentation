import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { studentService, type Student } from '@/services/student.service';
import { groupService, type Group } from '@/services/group.service';
import { Trash2, UserPlus, Users, Search, Edit2, Plus, X } from 'lucide-react';

export default function ManagementView() {
    const [students, setStudents] = useState<Student[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [newGroupName, setNewGroupName] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, gData] = await Promise.all([
                studentService.getAllStudents(),
                groupService.getAllGroups()
            ]);
            setStudents(sData);
            setGroups(gData);
        } catch (error) {
            console.error('Failed to fetch management data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteStudent = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this student? Data remains in results unless manually cleared.')) return;
        const { error } = await studentService.deleteStudent(id);
        if (error) alert('Error deleting student');
        else fetchData();
    };

    const handleUpdateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStudent) return;
        const { error } = await studentService.updateStudent(editingStudent.id, {
            name: editingStudent.name,
            group_id: editingStudent.group_id
        });
        if (error) alert('Error updating student');
        else {
            setEditingStudent(null);
            fetchData();
        }
    };

    const handleAddGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;
        const { error } = await groupService.createGroup(newGroupName.trim());
        if (error) alert('Error creating group');
        else {
            setNewGroupName('');
            fetchData();
        }
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.id.includes(search) ||
        s.group_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Groups Management */}
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Groups
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleAddGroup} className="flex gap-2">
                            <input 
                                type="text" 
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Group Name"
                                className="flex-1 bg-background border border-input rounded-md px-3 py-1 text-sm"
                            />
                            <Button type="submit" size="sm"><Plus className="h-4 w-4" /></Button>
                        </form>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                            {loading && <p className="text-xs text-center py-4 text-muted-foreground animate-pulse">Loading groups...</p>}
                            {groups.map(g => (
                                <div key={g.id} className="flex justify-between items-center p-2 rounded bg-muted/30 border border-border/50 text-sm">
                                    <span>{g.name}</span>
                                    <span className="text-xs text-muted-foreground font-mono">ID: {g.id}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Students Management */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Students
                        </CardTitle>
                        <div className="relative w-48">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search students..."
                                className="w-full pl-8 pr-3 py-2 text-xs bg-muted/50 border border-input rounded-md focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-muted-foreground border-b border-border/50">
                                    <tr>
                                        <th className="text-left font-medium pb-2">ID</th>
                                        <th className="text-left font-medium pb-2">Name</th>
                                        <th className="text-left font-medium pb-2">Group</th>
                                        <th className="text-right font-medium pb-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="text-center py-8 text-muted-foreground animate-pulse">Loading students...</td>
                                        </tr>
                                    ) : filteredStudents.map(s => (
                                        <tr key={s.id} className="group hover:bg-muted/30 transition-colors">
                                            <td className="py-3 font-mono text-xs">{s.id}</td>
                                            <td className="py-3 font-medium">{s.name}</td>
                                            <td className="py-3">
                                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                                    {s.group_name}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right space-x-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setEditingStudent(s)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDeleteStudent(s.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredStudents.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-8 text-muted-foreground">No students found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Student Modal-like Overlay */}
            {editingStudent && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Edit Student</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => setEditingStudent(null)}><X className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateStudent} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Student ID (Cannot Change)</label>
                                    <input value={editingStudent.id} disabled className="w-full bg-muted border border-input rounded-md px-3 py-2 text-sm opacity-60" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input 
                                        value={editingStudent.name} 
                                        onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Assign Group</label>
                                    <select 
                                        value={editingStudent.group_id || ''}
                                        onChange={(e) => setEditingStudent({...editingStudent, group_id: e.target.value ? parseInt(e.target.value) : null})}
                                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">No Group</option>
                                        {groups.map(g => (
                                            <option key={g.id} value={g.id}>{g.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setEditingStudent(null)}>Cancel</Button>
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
